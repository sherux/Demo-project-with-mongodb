const mongoose = require("mongoose");

const reviewschema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 250,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
reviewschema.virtual("user", {
  localField: "_id",
  foreignField: "userID",
  ref: "user",
  justOne: true,
});

module.exports = mongoose.model("review", reviewschema);
