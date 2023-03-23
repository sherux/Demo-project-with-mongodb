const mongoose = require("mongoose");

const Userdbschema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_mobile: {
      type: String,
      required: true,
    },
    user_gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "choose one options",
      },
    },
    user_country: {
      type: String,
      required: true,
    },
    user_city: {
      type: String,
      required: true,
    },
    user_img: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: " ",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", Userdbschema);
