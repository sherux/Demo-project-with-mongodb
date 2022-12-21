const express = require("express");
const route = express.Router();
const control = require("../controllers/admin.control");
const adminauth = require("../controllers/adminverifytoken");

// rolemangment route
route.get("/auth", adminauth, control.adminauth);
route.get("/getadmin/:id", control.getdata);
route.get("/getadmins", control.getalldata);
route.post("/create/", control.createdata);
route.delete("/delete/:id", adminauth, control.DeleteData);
route.post("/login", control.logindata);
route.post("/changepassword", adminauth, control.changepassword);
route.post("/forget-password", control.forgetpassword);
route.post("/Reset-password", control.resetpassword);

// route export
module.exports = route;
