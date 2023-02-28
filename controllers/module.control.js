const Module = require("../models/moduleschema");

// --------------------------------getall module--------------------------------
const getalldata2 = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const module = await Module.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res
      .status(200)
      .json({ message: "modules data fetch succesfully", data: module });
  } catch (error) {
    return res.status(400).json({ message: "modules are not found" });
  }
  next();
};
// -------------------------------------------create data----------------------

const createdata = async (req, res) => {
  const modules = new Module({
    module_name: req.body.module_name,
    module_id: req.body.module_id,
  });

  try {
    const modules2 = await modules.save();
    res
      .status(200)
      .json({ message: "module create succesfully ", data: modules2 });
  } catch (error) {
    res.status(400).json({ message: "please,required all fields" });
  }
};
// -------------------------------------------update data----------------------
const updatedata = async (req, res) => {
  try {
    const modules2 = {
      module_name: req.body.module_name,
    };
    const m1 = await Module.findByIdAndUpdate(req.params.id, modules2);
    res.status(200).json({
      message: "module succesfully update",
    });
  } catch (error) {
    res.status(400).json({ message: "modules are not found" });
  }
};

module.exports = {
  createdata,
  updatedata,
  getalldata2,
};
