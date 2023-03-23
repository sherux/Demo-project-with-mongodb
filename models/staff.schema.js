const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const staffdbschema = new mongoose.Schema(
  {
    roleId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "rolemanagement",
    },

    staff_name: {
      type: String,
      require: true,
    },
    staff_email: {
      type: String,
      require: true,
    },
    staff_password: {
      type: String,
      require: true,
    },
    staff_mobile: {
      type: String,
      require: true,
    },
    staff_gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "choose one options",
      },
    },
    staff_address: {
      type: String,
      require: true,
    },
    staff_city: {
      type: String,
      require: true,
    },

    staff_token: {
      type: String,
      default: " ",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("staff", staffdbschema);
