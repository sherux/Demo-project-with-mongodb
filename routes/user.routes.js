const express = require("express");
const route = express.Router();
const User = require("../controllers/user.control");
const userauth = require("../controllers/verifytoken.control");
const { uploadS3 } = require("../controllers/fileupload.control");

// user route
route.get("/getseraching", User.getSerachData);

route.get("/auth", userauth, User.auth);
route.get("/getusers", User.getalldata);
route.get("/getuser/:id", User.getonedata);
route.post("/register", uploadS3.single("profile"), User.registerdata);
route.post("/login", User.logindata);
route.put("/update/:id", userauth, uploadS3.single("profile"), User.UpdateData);
route.delete("/delete/:id", userauth, User.DeleteData);
route.post("/change-password", userauth, User.changepassword);
route.post("/forget-password", User.forgetpassword);
route.post("/Reset-password", User.resetpassword);

module.exports = route;
