const express = require("express");
const mongoose = require("mongoose");
const app = express();

PORT = process.env.PORT || 5000;

//-------------------------------------------route middleware---------------------------

app.use(express.json());

const Userroute = require("./routes/user.routes");
const Roleroute = require("./routes/role.routes");
const Menuroute = require("./routes/menu.routes");
const Orderroute = require("./routes/order.routes");
const Categoryroute = require("./routes/category.routes");
const Itemroute = require("./routes/items.routes");
const Restaurants = require("./routes/restaurants .routes");
const Admin = require("./routes/admin.routes");
const Staff = require("./routes/staff.routes");
const Modules2 = require("./routes/module.routes");
const Permission = require("./routes/permission.routes");
const Review = require("./routes/review.routes");
const ADMINDASHBOARD = require("./routes/admindashboard.routes");

app.use("/user", Userroute);
app.use("/user/role", Roleroute);
app.use("/menu", Menuroute);
app.use("/order", Orderroute);
app.use("/category", Categoryroute);
app.use("/item", Itemroute);
app.use("/restaurants", Restaurants);
app.use("/admin", Admin);
app.use("/staff", Staff);
app.use("/module", Modules2);
app.use("/permission", Permission);
app.use("/review", Review);
app.use("/admin/dashboard", ADMINDASHBOARD);

// -----------------------------------connect to the database----------------------

mongoose
  .connect("mongodb://localhost:27017/USERINFORMATION")
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}....`);
});
