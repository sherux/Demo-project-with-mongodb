const express = require("express");
const route = express.Router();
const control = require("../controllers/items.control");
const { uploadS3 } = require("../controllers/fileupload.control");
const adminauth = require("../controllers/adminverifytoken");
const staffauth = require("../controllers/middlware");

// rolemangment route
route.get("/getitem/:id", control.getitem);
route.get("/getitems", control.getallitem);
route.post(
  "/create",
  adminauth,
  staffauth(3, "add item"),

  uploadS3.single("image"),
  control.createitem
);
route.put(
  "/update/:id",
  adminauth,
  staffauth(3, "edit item"),
  control.updateitem
);
route.delete(
  "/delete/:id",
  adminauth,
  staffauth(3, "delete item"),
  control.deleteitem
);

// route export
module.exports = route;
