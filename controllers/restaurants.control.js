const Restaurants = require("../models/restaurantschema");
const Order = require("../models/orderschema");
const ISODate = require("isodate");
// ------------------------------------- -getone data by staff----------------------
const getrestaurantsbystaff = async (req, res) => {
  try {
    const restaurant = await Restaurants.findById(req.params.id)
      .status(200)
      .json({ message: "restaurant data fetch succesfully", data: restaurant });
  } catch (error) {
    res.status(400).json({ message: "sorry,restaurant is not found" });
  }
};
// -------------------------------------getone data by admin-------------
const getrestaurantsbyadmin = async (req, res) => {
  try {
    const restaurant = await Restaurants.findById(req.params.id);
    res
      .status(200)
      .json({ message: "restaurant data fetch succesfully", data: restaurant });
  } catch (error) {
    res.status(400).json({ message: "sorry,restaurant is not found" });
  }
};
// --------------------getall data admin-------------------
const getallrestaurantsbystaff = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const restaurants = await Restaurants.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.status(200).json({
      message: "restaurant data fetch succesfully",
      data: restaurants,
    });
  } catch (error) {
    res.status(400).json({ message: "sorry,restaurant is not found" });
  }
};
// -------------------------------------------getall data----------------------
const getallrestaurantsbyadmin = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const restaurants = await Restaurants.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const order = await Order.find();
    res.status(200).json({
      message: "restaurants data fetch succesfully",
      data: restaurants,
    });
  } catch (error) {
    res.status(400).json({ mesage: "please,required all fields" });
  }
};
// -------------------------------------------create data by resturant ----------------------

const createrestaurantsbystaff = async (req, res) => {
  const newrestaurants = new Restaurants({
    restaurant_name: req.body.restaurant_name,
    restaurant_address: req.body.restaurant_address,
    restaurant_phone_number: req.body.restaurant_phone_number,
    restaurant_location: req.body.restaurant_location,
    restaurant_status: req.body.restaurant_status,
    restaurant_description: req.body.restaurant_description,
    restaurant_ratings: req.body.restaurant_ratings,
  });

  try {
    const restaurants = await newrestaurants.save();

    res.status(200).json({
      message: "restaurant created succesfully",
      data: restaurants,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// ----------------------------create data by admin-------------
const createrestaurantsbyadmin = async (req, res) => {
  const newrestaurants = new Restaurants({
    restaurant_name: req.body.restaurant_name,
    restaurant_address: req.body.restaurant_address,
    restaurant_phone_number: req.body.restaurant_phone_number,
    restaurant_location: req.body.restaurant_location,
    restaurant_status: req.body.restaurant_status,
    restaurant_description: req.body.restaurant_description,
    restaurant_ratings: req.body.restaurant_ratings,
  });

  try {
    const restaurants = await newrestaurants.save();

    res.status(200).json({
      message: "restaurant created succesfully",
      data: restaurants,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// -------------------------------------------update data by staff----------------------
const updaterestaurantsbystaff = async (req, res) => {
  try {
    const restaurants = {
      restaurant_name: req.body.restaurant_name,
      restaurant_address: req.body.restaurant_address,
      restaurant_phone_number: req.body.restaurant_phone_number,
      restaurant_location: req.body.restaurant_location,
      restaurant_status: req.body.restaurant_status,
      restaurant_description: req.body.restaurant_description,
      restaurant_ratings: req.body.restaurant_ratings,
    };
    const restaurantss = await Restaurants.findByIdAndUpdate(
      req.params.id,
      restaurants
    );
    res.status(200).json({
      message: "restaurant data update succesfully ",
    });
  } catch (error) {
    res.status(400).json({ message: "sorry,restaurant is not found" });
  }
};
// -------------------------------------------update data by admin----------------------
const updaterestaurantsbyadmin = async (req, res) => {
  try {
    const restaurants = {
      restaurant_name: req.body.restaurant_name,
      restaurant_address: req.body.restaurant_address,
      restaurant_phone_number: req.body.restaurant_phone_number,
      restaurant_location: req.body.restaurant_location,
      restaurant_status: req.body.restaurant_status,
      restaurant_description: req.body.restaurant_description,
      restaurant_ratings: req.body.restaurant_ratings,
    };
    const restaurantss = await Restaurants.findByIdAndUpdate(
      req.params.id,
      restaurants
    );
    res.status(200).json({
      message: "restaurant data update succesfully ",
    });
  } catch (error) {
    res.status(400).json({ message: "sorry,restaurant is not found" });
  }
};
// -------------------------------------------delated data by staff----------------------

const deleterestaurantsbystaff = async (req, res) => {
  try {
    const restaurants = await Restaurants.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "restaurant data delete succesfully  " });
  } catch (error) {
    res.status(400).json({ message: "sorry,restaurant is not found" });
  }
};
// -------------------------------------------delated data by admin----------------------

const deleterestaurantsbyadmin = async (req, res) => {
  try {
    const restaurants = await Restaurants.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "restaurant data delete succesfully  " });
  } catch (error) {
    res.status(400).json({ message: "sorry,restaurant is not found" });
  }
};

module.exports = {
  getrestaurantsbystaff,
  getrestaurantsbyadmin,
  getallrestaurantsbyadmin,
  getallrestaurantsbystaff,
  createrestaurantsbystaff,
  createrestaurantsbyadmin,
  updaterestaurantsbystaff,
  updaterestaurantsbyadmin,
  deleterestaurantsbystaff,
  deleterestaurantsbyadmin,
};
