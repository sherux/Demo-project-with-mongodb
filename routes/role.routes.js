const express = require("express");
const route = express.Router();
const control = require("../controllers/role.control");

// rolemangment route
route.get("/getrole/:id", control.getdata);
route.get("/getroles", control.getalldata);
route.post("/register", control.createdata);
route.put("/update/:id", control.updatedata);
route.delete("/delete/:id", control.deletedata);

// route export
module.exports = route;
