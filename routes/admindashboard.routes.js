const express = require("express");
const route = express.Router();

const control = require("../controllers/admindashboard.control");

// rolemangment route

route.get("/", control.getdashboard);

// route export
module.exports = route;
