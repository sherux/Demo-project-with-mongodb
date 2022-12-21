const express = require("express");
const route = express.Router();

const control = require("../controllers/module.control");

// rolemangment route

route.post("/create/", control.createdata);
route.put("/update/:id", control.updatedata);

// route export
module.exports = route;
