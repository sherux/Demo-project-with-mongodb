const jwt = require("jsonwebtoken");
const staff = require("../models/staff.schema");
const permission = require("../models/permission.schema");

// -------------------------------role wise permission API----------------------
const staffauth = (module_id, module_name) => {
  return async (req, res, next) => {
    const token = req.header("staff-token");
    if (!token) return res.status(401).json("please,login");

    try {
      const varifield = jwt.verify(token, process.env.SECRET_TOKEN3);
      req.staffs = varifield;
      const getid = varifield.id;
      const checkid = await staff.find({ _id: { $in: getid } });

      const getroleid = checkid[0].roleId;
      console.log("===================================>", getroleid);
      const getpermission = await permission.find({
        role_id: { $in: getroleid },
      });
      var allow = false;
      getpermission.forEach((element) => {
        if (
          element.module_id == module_id &&
          req.method == "POST" &&
          element.permission_add
        )
          allow = true;
        else if (
          element.module_id == module_id &&
          req.method === "GET" &&
          element.permission_view
        )
          allow = true;
        else if (
          element.module_id == module_id &&
          req.method === "PUT" &&
          element.permission_edit
        )
          allow = true;
        else if (
          element.module_id == module_id &&
          req.method === "DELETE" &&
          element.permission_delete
        )
          allow = true;
      });
      if (allow) next();
      else {
        return res
          .status(200)
          .json({ message: `you don't have the access to ${module_name}` });
      }
    } catch (err) {
      res.status(400).json("staff  not found");
    }
  };
};

module.exports = staffauth;
