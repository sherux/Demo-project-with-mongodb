const mongoose = require("mongoose");
const itemschema = new mongoose.Schema(
  {
    menuId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Menu",
      },
    ],
    categoryID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "category",
      },
    ],
    items_name: [
      {
        type: String,
        require: true,
      },
    ],

    item_description: {
      type: String,
      require: true,
    },

    item_ingredients: {
      type: String,
      require: true,
    },

    item_price: {
      type: Number,
      require: true,
    },
    item_img: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("item", itemschema);
