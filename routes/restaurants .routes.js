const express = require("express");
const route = express.Router();
const control = require("../controllers/restaurants.control");
const { uploadS3 } = require("../controllers/fileupload.control");
const adminauth = require("../controllers/adminverifytoken");
const staffauth = require("../controllers/middlware");

// rolemangment route
route.get(
  "/getrestaurantbtstaff/:id",
  staffauth(2, "view restaurant"),
  control.getrestaurantsbystaff
);
route.get(
  "/getrestaurantbyadmin/:id",
  adminauth,
  control.getrestaurantsbyadmin
);
route.get(
  "/getrestaurantsbydstaff",
  staffauth(2, "view all restaurant"),
  control.getallrestaurantsbystaff
);
route.get(
  "/getrestaurantsbyadmin/",
  adminauth,
  control.getallrestaurantsbyadmin
);
route.post(
  "/create",
  adminauth,
  staffauth(2, "add restaurant"),
  uploadS3.single("image"),
  control.createrestaurantsbystaff
);
route.post(
  "/admin/create",
  adminauth,
  uploadS3.single("image"),
  control.createrestaurantsbyadmin
);
route.put(
  "/update/:id",
  adminauth,
  staffauth(2, "edit restaurant"),
  control.updaterestaurantsbystaff
);
route.put("/admin/update/:id", adminauth, control.updaterestaurantsbyadmin);
route.delete(
  "/delete/:id",
  adminauth,
  staffauth(2, "delete restaurant"),
  control.deleterestaurantsbystaff
);
route.delete("/admin/delete/:id", adminauth, control.deleterestaurantsbyadmin);

// route export
module.exports = route;
