const Menu = require("../models/menu.schema");
const Order = require("../models/order.schema");
const User = require("../models/user.schema");
const ObjectId = require("mongoose").Types.ObjectId;

// ------------------------------getall menu---------------------
const getdashboard = async (req, res) => {
  try {
    const restaurantID = req.body.id;
    console.log("id", restaurantID);
    if (restaurantID) {
      const menu = await Menu.find({
        restaurantID: { $in: ObjectId(restaurantID) },
      });

      const order = await Order.find({
        restaurantID: { $in: ObjectId(restaurantID) },
      });

      const totalorderpending = await Order.find({
        restaurantID: { $in: ObjectId(restaurantID) },

        status: { $in: ["pending"] },
      });
      const totalorderpreparing = await Order.find({
        restaurantID: { $in: ObjectId(restaurantID) },
        status: { $in: ["preparing"] },
      });
      const totalordercancelled = await Order.find({
        restaurantID: { $in: ObjectId(restaurantID) },
        status: { $in: ["cancelled"] },
      });
      const totalorderrejected = await Order.find({
        restaurantID: { $in: ObjectId(restaurantID) },
        status: { $in: ["rejected"] },
      });
      const totalordercompleted = await Order.find({
        restaurantID: { $in: ObjectId(restaurantID) },
        status: { $in: ["completed"] },
      });

      const obj = {
        totalorderpending: totalorderpending.length,
        totalorderpreparing: totalorderpreparing.length,
        totalordercancelled: totalordercancelled.length,
        totalorderrejected: totalorderrejected.length,
        totalordercompleted: totalordercompleted.length,
      };

      res.status(200).json({
        message: "data fetch succesfully",
        totalmenus: menu.length,
        totalorders: order.length,
        data: obj,
      });
    } else {
      const menu = await Menu.find();

      const order = await Order.find();
      const customer = await User.find();

      const totalorderpending = await Order.find({
        status: { $in: ["pending"] },
      });
      const totalorderpreparing = await Order.find({
        status: { $in: ["preparing"] },
      });
      const totalordercancelled = await Order.find({
        status: { $in: ["cancelled"] },
      });
      const totalorderrejected = await Order.find({
        status: { $in: ["rejected"] },
      });
      const totalordercompleted = await Order.find({
        status: { $in: ["completed"] },
      });

      const obj = {
        totalorderpending: totalorderpending.length,
        totalorderpreparing: totalorderpreparing.length,
        totalordercancelled: totalordercancelled.length,
        totalorderrejected: totalorderrejected.length,
        totalordercompleted: totalordercompleted.length,
      };
      return res.status(200).json({
        message: "All data fetch succesfully",
        totalmenus: menu.length,
        totalorders: order.length,
        totalcustomers: customer.length,
        data: obj,
      });
    }
  } catch (e) {
    return res.json({ message: "Sorry,Data not found" });
  }
};

module.exports = {
  getdashboard,
};
