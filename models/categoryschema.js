const mongoose = require("mongoose");
const categoryschema = new mongoose.Schema(
  {
    menuId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Menu",
      },
    ],
    category_name: {
      type: [
        {
          type: String,
          require: true,
        },
      ],
    },
    category_description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categoryschema);
