const express = require("express");
const route = express.Router();
const control = require("../controllers/order.control");
const userauth = require("../controllers/verifytoken.control");
const staffauth = require("../controllers/middlware");
const adminauth = require("../controllers/adminverifytoken");

// rolemangment route

route.get(
  "/getorderbystaff/:id",
  staffauth(6, "view order"),
  control.getorderbystaff
);
route.get("/getorderbyadmin/:id", adminauth, control.getorderbyadmin);
route.get("/getorderbyuser/:id", userauth, control.getorderbyuser);
route.get("/getorders", userauth, control.getallorder);
route.post("/create", userauth, control.createorder);
route.put("/update/:id", userauth, control.updateorderbyuser);
route.put(
  "/update/:id",
  staffauth(6, "update order"),
  control.updateorderbyuser
);

route.delete("/delete/:id", staffauth(6, "delete order"), control.deleteorder);

// route export
module.exports = route;
