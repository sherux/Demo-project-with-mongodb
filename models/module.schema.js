const mongoose = require("mongoose");
const moduleschema = new mongoose.Schema(
  {
    module_name: {
      type: String,
    },

    module_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("module", moduleschema);
