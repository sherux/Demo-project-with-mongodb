const Menu = require("../models/menu.schema");

// -------------------------------------------getone data----------------------
const getdata = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res
      .status(200)
      .json({ message: "menu data fetch succesfully", data: menu });
  } catch (error) {
    res.status(400).json({ message: "sorry,menu is not found" });
  }
};
// -------------------------------------------getall data----------------------
const getalldata = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const menus = await Menu.find()

      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: "menus data fetch succesfully", data: menus });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// -----------------------------------------create data----------------------

const createdata = async (req, res) => {
  const newdata = new Menu({
    restaurantID: req.body.restaurantID,
    menu_name: req.body.menu_name,
    menu_description: req.body.menu_description,
    menu_img: req.body.location,
  });

  try {
    const menu = await newdata.save();
    res.status(200).json({ message: "menu created succesfully", data: menu });
  } catch (error) {
    res.status(400).json({ message: "please,required all fields" });
  }
};
// -------------------------------------------update data----------------------
const updatedata = async (req, res) => {
  try {
    const menu = {
      restaurantID: req.body.restaurantID,
      menu_name: req.body.menu_name,
      menu_description: req.body.menu_description,
      menu_img: req.body.location,
    };
    const data2 = await Menu.findByIdAndUpdate(req.params.id, menu);
    res.status(200).json({ message: "menu succesfully update" });
  } catch (error) {
    res.status(400).json({ message: "sorry,menu is not found" });
  }
};
// -------------------------------------------delated data----------------------

const deletedata = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "menu  delete  succesfully " });
  } catch (error) {
    res.status(400).json({ message: "sorry,menu is not found " });
  }
};
module.exports = {
  getdata,
  getalldata,
  createdata,
  updatedata,
  deletedata,
};
