const express = require("express");
const route = express.Router();

const { createdata, updatedata } = require("../controllers/module.control");

// rolemangment route

route.post("/create/", createdata);
route.put("/update/:id", updatedata);

// route export
module.exports = route;
