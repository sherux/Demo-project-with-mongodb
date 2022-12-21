const express = require("express");
const route = express.Router();
const control = require("../controllers/category.control");
const adminauth = require("../controllers/adminverifytoken");
const staffauth = require("../controllers/middlware");

// rolemangment route
route.get("/getcategory/:id", control.getcategory);
route.get("/getcategorys", control.getallcategory);
route.post(
  "/create",
  adminauth,
  staffauth(4, "add category"),
  control.createcategory
);
route.put(
  "/update/:id",
  adminauth,
  staffauth(4, "edit category"),
  control.updatecategory
);
route.delete(
  "/delete/:id",
  adminauth,
  staffauth(4, "delete category"),
  control.deletecategory
);

// route export
module.exports = route;
