const Role = require("../models/role.schema");
const module2 = require("../models/module.schema");
const permission2 = require("../models/permission.schema");

// -------------------------------------------getone data----------------------
const getdata = async (req, res) => {
  try {
    const emp = await Role.findById(req.params.id);
    res
      .status(200)
      .json({ message: "employee data fetch succesfully", data: emp });
  } catch (error) {
    res.status(400).json({ message: "sorry,employee not found" });
  }
};
// -------------------------------------------getall data----------------------
const getalldata = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const emp = await Role.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: "employees data fetch succesfully", data: emp });
  } catch (error) {
    res.json({ message: "sorry,employees not found" });
  }
};
// -------------------------------------------create data----------------------

const createdata = async (req, res, next) => {
  const newuser = new Role({
    role_name: req.body.role_name,
    role_description: req.body.role_description,
    role_status: req.body.role_status,
  });

  try {
    const emp = await newuser.save();

    // getallmodules data
    const module = await module2.find();
    if (!module) return res.status(404).json("module not found");
    //  modulesdata foreach in which permission
    const permission = [];
    module.forEach((element) => {
      {
        permission.push({
          module_id: element.module_id,
          permission_add: true,
          permission_delete: true,
          permission_edit: true,
          permission_view: true,
        });
      }
    });

    // create permission data from permission array
    module.forEach((element) => {
      if (
        req.body.role_type === ("resturant_admin" && "resturant_sub_admin") &&
        element.module_id === "2"
      ) {
        const permissionss = new permission2({
          role_id: emp._id,
          module_id: element.module_id,
          permission_add: false,
          permission_delete: false,
          permission_edit: false,
          permission_view: false,
        });
        permissionss.save();
      } else {
        const permissionss = new permission2({
          role_id: emp._id,
          module_id: element.module_id,
          permission_add: true,
          permission_delete: true,
          permission_edit: true,
          permission_view: true,
        });
        permissionss.save();
      }
    });
    const rr = {
      data: emp,
      V: permission,
    };

    res.status(200).json({ message: "employee create succesfully", data: rr });
  } catch (error) {
    return res.status(400).json({ message: "sorry,module not found" });
  }
};
// -------------------------------------------update data---------------------
const updatedata = async (req, res) => {
  try {
    const emp = {
      role_name: req.body.role_name,
      role_description: req.body.role_description,
      role_status: req.body.role_status,
    };
    const e1 = await Role.findByIdAndUpdate(req.params.id, emp);
    res.status(200).json({
      message: "employee succesfully update",
    });
  } catch (error) {
    res.status(400).json({ message: "sorry,employee not found" });
  }
};
// -------------------------------------------deleted data----------------------

const deletedata = async (req, res) => {
  try {
    const id = req.params.id;
    const emp = await Role.findByIdAndDelete({ _id: id });
    // await permission2.deleteMany({});
    await permission2.deleteMany({ role_id: id });

    res.status(200).json({ message: "Data succesfully delete " });
  } catch (error) {
    res.status(400).json({ message: "sorry,employee not found" });
  }
};

module.exports = {
  getdata,
  getalldata,
  createdata,
  updatedata,
  deletedata,
};
