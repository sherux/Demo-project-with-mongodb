const Review = require("../models/reviewschema");

// -------------------------------------------getone data----------------------
const getdata = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate({
      path: "userID",
      select: "user_name user_img -_id ",
    });
    const review2 = await Review.findById(req.params.id).select(
      "comment img _id rating createdAt updatedAt"
    );

    const obj = {
      user: review.userID,
      comment: review2.comment,
      img: review2.img,
      rating: review2.rating,
      _id: review2._id,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };

    res
      .status(200)
      .json({ message: "review data fetch succesfully", data: obj });
  } catch (error) {
    // res.status(400).json({ message: "sorry,review is not found" });
    res.status(400).json(error.message);
  }
};
// -------------------------------------------getall data----------------------
const getalldata = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const reviews = await Review.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: "reviews data fetch succesfully", data: reviews });
  } catch (error) {
    res.status(400).json({ message: "sorry,reviews is not found" });
  }
};
// -----------------------------------------create data----------------------

const createdata = async (req, res) => {
  const newdata = new Review({
    userID: req.body.userID,
    orderID: req.body.orderID,
    comment: req.body.comment,
    rating: req.body.rating,
    img: req.file.location,
  });

  try {
    await newdata.save();

    res
      .status(200)
      .json({ message: "review created succesfully", data: newdata });
  } catch (error) {
    res.status(400).json({ message: "please,required all fields" });
    // res.status(400).json(error.message);
  }
};
// -------------------------------------------update data----------------------
const updatedata = async (req, res) => {
  try {
    const review = {
      userID: req.body.userID,
      orderID: req.body.orderID,
      comment: req.body.comment,
      rating: req.body.rating,
      img: req.file.location,
    };

    const data2 = await Review.findByIdAndUpdate(req.params.id, review);
    res.status(200).json({ message: "review succesfully update" });
  } catch (error) {
    res.status(400).json({ message: "sorry,review is not found" });
  }
};
// -------------------------------------------delated data----------------------

const deletedata = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "review  delete  succesfully " });
  } catch (error) {
    res.status(400).json({ message: "sorry,review is not found " });
  }
};
module.exports = {
  getdata,
  getalldata,
  createdata,
  updatedata,
  deletedata,
};
