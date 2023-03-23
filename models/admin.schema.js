const mongoose = require("mongoose");
const adminschema = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      require: true,
    },

    admin_email: {
      type: String,
      require: true,
    },

    admin_password: {
      type: String,
      require: true,
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

module.exports = mongoose.model("admin", adminschema);
