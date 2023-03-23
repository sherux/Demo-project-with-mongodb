const mongoose = require("mongoose");

const rolemangmentschema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      require: true,
    },
    role_description: {
      type: String,
      require: [true, "please add a description"],
    },
    role_status: {
      type: [
        {
          type: String,
          enum: ["Active", "InActive"],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rolemanagement", rolemangmentschema);
