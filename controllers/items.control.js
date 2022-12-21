const Item = require("../models/itemsschema");

// -------------------------------------------getone data----------------------
const getitem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res
      .status(200)
      .json({ message: "item data fetch succesfully", data: item });
  } catch (error) {
    res.status(400).json({ message: "sorry,this item not found" });
  }
};
// -------------------------------------------getall data----------------------
const getallitem = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const item = await Item.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: "items data fetch succesfully", data: item });
  } catch (error) {
    res.status(400).json({ message: "sorry, items not found" });
  }
};
// -------------------------------------------create data----------------------

const createitem = async (req, res) => {
  const newitem = new Item({
    menuId: req.body.menuId,
    categoryID: req.body.categoryID,
    items_name: req.body.items_name,
    item_description: req.body.item_description,
    item_ingredients: req.body.item_ingredients,
    item_price: req.body.item_price,
    item_img: req.file.location,
  });

  try {
    const item = await newitem.save();
    res.status(200).json({ message: "item succesfully created", data: item });
  } catch (error) {
    res.status(400).json({ message: "please,required all fields" });
  }
};
// -------------------------------------------update data----------------------
const updateitem = async (req, res) => {
  try {
    const item = {
      menuId: req.body.menuId,
      categoryID: req.body.categoryID,
      items_name: req.body.items_name,
      item_description: req.body.item_description,
      item_ingredients: req.body.item_ingredients,
      item_price: req.body.item_price,
      item_img: req.file.location,
    };
    const items = await Item.findByIdAndUpdate(req.params.id, item);
    res.status(200).json({
      message: "items update succesfully ",
    });
  } catch (error) {
    res.status(400).json({ message: "sorry,this item not found" });
  }
};
// -------------------------------------------delated data----------------------

const deleteitem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "items  delete succesfully  " });
  } catch (error) {
    res.status(400).json({ message: "sorry,this item not found" });
  }
};
module.exports = {
  getitem,
  getallitem,
  createitem,
  updateitem,
  deleteitem,
};
