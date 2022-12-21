const express = require("express");
const route = express.Router();
const control = require("../controllers/menu.control");
const { uploadS3 } = require("../controllers/fileupload.control");
const adminauth = require("../controllers/adminverifytoken");
const staffauth = require("../controllers/middlware");

// rolemangment route
route.get("/getmenu/:id", control.getdata);
route.get("/getmenus", control.getalldata);
route.post(
  "/create/",
  adminauth,
  staffauth(5, "add menu"),
  uploadS3.single("image"),
  control.createdata
);
route.put(
  "/update/:id",
  adminauth,
  staffauth(5, "edit menu"),
  control.updatedata
);
route.delete(
  "/delete/:id",
  adminauth,
  staffauth(5, "delete menu"),
  control.deletedata
);

// route export
module.exports = route;
