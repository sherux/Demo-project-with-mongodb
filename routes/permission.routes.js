const express = require("express");
const route = express.Router();
const control = require("../controllers/permission.control");

// permission route
route.get("/all/:id", control.getpermission);
route.get("/all", control.getallpermission);
route.put("/update/", control.updatepermission);

// route export
module.exports = route;
