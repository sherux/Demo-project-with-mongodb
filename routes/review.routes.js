const express = require("express");
const route = express.Router();
const userauth = require("../controllers/verifytoken.control");
const control = require("../controllers/review.control");
const { uploadS3 } = require("../controllers/fileupload.control");

// rolemangment route

route.get("/getreviews", control.getalldata);
route.get("/getreview/:id", control.getdata);
route.post("/create", userauth, uploadS3.single("img"), control.createdata);
route.put("/update/:id", userauth, uploadS3.single("img"), control.updatedata);
route.delete("/delete/:id", userauth, control.deletedata);

// route export
module.exports = route;
