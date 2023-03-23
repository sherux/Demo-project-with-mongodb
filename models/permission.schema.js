const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const permissionschema = new mongoose.Schema(
  {
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "rolemanagement",
    },
    module_id: {
      type: Number,
      ref: "module",
    },

    permission_add: {
      type: Boolean,
    },
    permission_edit: {
      type: Boolean,
    },
    permission_delete: {
      type: Boolean,
    },
    permission_view: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("permission", permissionschema);
