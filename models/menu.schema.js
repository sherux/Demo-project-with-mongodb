const mongoose = require("mongoose");
const menuschema = new mongoose.Schema(
  {
    restaurantID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "restaurant",
      },
    ],

    menu_name: [
      {
        type: String,
        require: true,
      },
    ],

    menu_description: {
      type: String,
      require: true,
    },
    menu_img: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", menuschema);
