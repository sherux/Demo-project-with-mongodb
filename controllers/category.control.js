const Category = require("../models/category.schema");

// -------------------------------------------getone data----------------------
const getcategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res
      .status(200)
      .json({ message: "category data fetch succesfully", data: category });
  } catch (error) {
    res.satus(400).json({ message: "sorry,category is not found" });
  }
};
// -------------------------------------------getall data----------------------
const getallcategory = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const categorys = await Category.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: " categorys data fetch succesfully ", data: categorys });
  } catch (error) {
    res.status(400).json({ message: "sorry,category is not found" });
  }
};
// -------------------------------------------create data----------------------

const createcategory = async (req, res) => {
  const newcategory = new Category({
    menuId: req.body.menuId,
    category_name: req.body.category_name,
    category_description: req.body.category_description,
  });

  try {
    const category = await newcategory.save();

    res.status(200).json({ message: "category created ", data: category });
  } catch (error) {
    res.status(400).json({ message: "please,required all fields" });
  }
};
// -------------------------------------------update data----------------------
const updatecategory = async (req, res) => {
  try {
    const category = {
      menuId: req.body.menuId,
      category_name: req.body.category_name,
      category_description: req.body.category_description,
    };
    const categorys = await Category.findByIdAndUpdate(req.params.id, category);
    res.status(200).json({
      message: "category update succesfully ",
    });
  } catch (error) {
    res.status(400).json({ message: "sorry,this category not found" });
  }
};
// -------------------------------------------delated data----------------------

const deletecategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "category  delete succesfully  " });
  } catch (error) {
    res.status(400).json({ message: "sorry,this category not found" });
  }
};

module.exports = {
  getcategory,
  getallcategory,
  createcategory,
  updatecategory,
  deletecategory,
};
