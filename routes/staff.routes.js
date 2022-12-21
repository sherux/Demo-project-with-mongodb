const express = require("express");
const route = express.Router();
const staff = require("../controllers/staff.control");
const staffauth2 = require("../controllers/staffverifytoken");

// staff route
route.get("/auth", staffauth2, staff.auth);
route.get("/getstaffs", staff.getalldata);
route.get("/getstaff/:id", staff.getonedata);
route.post("/register", staff.registerdata);
route.post("/login", staff.logindata);
route.put("/update/:id", staffauth2, staff.UpdateData);
route.delete("/delete/:id", staffauth2, staff.DeleteData);
route.post("/change-password", staffauth2, staff.changepassword);
route.post("/forget-password", staff.forgetpassword);
route.post("/Reset-password", staff.resetpassword);

module.exports = route;
