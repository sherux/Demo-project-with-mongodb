const Permission = require("../models/permissionschema");

// -------------------------------------------getone data----------------------
const getpermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    res
      .status(200)
      .json({ mesage: "permission data fetch succesfully", data: permission });
  } catch (error) {
    res.status(400).json({ message: "sorry,permissions are not found" });
  }
};
// -------------------------------------------getall data----------------------
const getallpermission = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const permission = await Permission.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ mesage: "permissions data fetch succesdully", data: permission });
  } catch (error) {
    res.status(400).json({ message: "sorry,permissions are not found" });
  }
};

// -------------------------------------------update data----------------------
const updatepermission = async (req, res) => {
  try {
    const data = req.body;

    data.forEach(async (element) => {
      const p1 = await Permission.updateMany(
        { role_id: element.role_id, module_id: element.module_id },

        {
          $set: {
            role_id: element.role_id,
            module_id: element.module_id,
            permission_add: element.permission_add,
            permission_edit: element.permission_edit,
            permission_delete: element.permission_delete,
            permission_view: element.permission_view,
          },
        }
      );
    });

    res.status(200).json({
      message: "permission update succesfully",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "sorry,role and module are not found" });
  }
};

module.exports = {
  getpermission,
  getallpermission,
  updatepermission,
};
