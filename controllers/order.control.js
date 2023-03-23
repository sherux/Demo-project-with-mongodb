const Order = require("../models/orderschema");
const User = require("../models/userschema");

// ------------------------------getone order by staff -------------------
const getorderbystaff = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "userID",
      select: "user_name user_email -_id",
    });
    const order2 = await Order.findById(req.params.id).select(
      "userID restaurantID item quantity isPurchased isDelivered status place city pincode landmark amount createdAt updatedAt"
    );
    const obj = {
      user: order.userID,
      restaurantID: order2.restaurantID,
      item: order2.item,
      quantity: order2.quantity,
      isPurchased: order2.isPurchased,
      isDelivered: order2.isDelivered,
      status: order2.status,
      place: order2.place,
      city: order2.city,
      pincode: order2.pincode,
      landmark: order2.landmark,
      amount: order2.amount,
      createdAt: order2.createdAt,
      updatedAt: order2.updatedAt,
    };

    if (order.isDelivered) {
      res.status(200).json({
        message: "Order already delivered to customer",
        data: obj,
      });
    } else {
      res.status(200).json({ message: "order is pending", data: obj });
    }
  } catch (error) {
    res.status(400).json({ message: "sorry,order is not found" });
    // res.status(400).json(error.message);
  }
};
// ------------------------------get one order by user-----------
const getorderbyuser = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order.isDelivered) {
      return res
        .status(200)
        .json({ message: "Order already delivered to customer", data: order });
    } else {
      res.status(200).json({ message: "order is pending", order });
    }
  } catch (error) {
    res.status(400).json({ message: "sorry,order is not found" });
  }
};
// --------------------get one data by admin----------------------
const getorderbyadmin = async (req, res) => {
  try {
    const order2 = await Order.findById(req.params.id).populate("user", {
      user_name: 1,
      user_mobile: 1,
    });

    const orderpending = await Order.aggregate([
      { $match: { status: { $in: ["pending"] } } },
    ]);
    const orderpreparing = await Order.aggregate([
      { $match: { status: { $in: ["preparing"] } } },
    ]);
    const ordercompleted = await Order.aggregate([
      { $match: { status: { $in: ["completed"] } } },
    ]);
    const ordercancelled = await Order.aggregate([
      { $match: { status: { $in: ["cancelled"] } } },
    ]);
    const orderrejected = await Order.aggregate([
      { $match: { status: { $in: ["rejected"] } } },
    ]);
    const totalpendingorder = await Order.find({
      status: { $in: ["pending"] },
    });

    const totalpreparingorder = await Order.find({
      status: { $in: ["preparing"] },
    });
    const totalcompletedorder = await Order.find({
      status: { $in: ["completed"] },
    });
    const totalcancelledorder = await Order.find({
      status: { $in: ["cancelled"] },
    });
    const totalrejectedorder = await Order.find({
      status: { $in: ["rejected"] },
    });

    const obj = {
      pending: [],
      preparing: [],
      completed: [],
      cancelled: [],
      rejected: [],
      totalpendingorder: totalpendingorder.length,
      totalpreparingorder: totalpreparingorder.length,
      totalcompletedorder: totalcompletedorder.length,
      totalcancelledorder: totalcancelledorder.length,
      totalrejectedorder: totalrejectedorder.length,
    };
    obj.pending = orderpending;
    obj.preparing = orderpreparing;
    obj.completed = ordercompleted;
    obj.cancelled = ordercancelled;
    obj.rejected = orderrejected;

    res
      .status(200)
      .json({ message: " orders data fetch succesfully ", data: obj });
  } catch (error) {
    // res.status(400).json({ message: "sorry,order is not found" });
    res.status(400).json(error.message);
  }
};
// -------------------------------------------getall data by user----------------------
const getallorder = async (req, res) => {
  try {
    const orderpending = await Order.aggregate([
      { $match: { status: { $in: ["pending"] } } },
    ]);
    const orderpreparing = await Order.aggregate([
      { $match: { status: { $in: ["preparing"] } } },
    ]);
    const ordercompleted = await Order.aggregate([
      { $match: { status: { $in: ["completed"] } } },
    ]);
    const ordercancelled = await Order.aggregate([
      { $match: { status: { $in: ["cancelled"] } } },
    ]);
    const orderrejected = await Order.aggregate([
      { $match: { status: { $in: ["rejected"] } } },
    ]);
    const totalpendingorder = await Order.find({
      status: { $in: ["pending"] },
    });

    const totalpreparingorder = await Order.find({
      status: { $in: ["preparing"] },
    });
    const totalcompletedorder = await Order.find({
      status: { $in: ["completed"] },
    });
    const totalcancelledorder = await Order.find({
      status: { $in: ["cancelled"] },
    });
    const totalrejectedorder = await Order.find({
      status: { $in: ["rejected"] },
    });
    const obj = {
      pending: [],
      preparing: [],
      completed: [],
      cancelled: [],
      rejected: [],
      totalpendingorder: totalpendingorder.length,
      totalpreparingorder: totalpreparingorder.length,
      totalcompletedorder: totalcompletedorder.length,
      totalcancelledorder: totalcancelledorder.length,
      totalrejectedorder: totalrejectedorder.length,
    };
    obj.pending = orderpending;
    obj.preparing = orderpreparing;
    obj.completed = ordercompleted;
    obj.cancelled = ordercancelled;
    obj.rejected = orderrejected;

    // ---------------- date filter for orders BY user--------------------------------
    if (req.body.Start_date || req.body.End_date) {
      const datebyorder = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gt: new Date(req.body.Start_date),
              $lte: new Date(req.body.End_date),
            },
          },
        },
      ]);
      if (req.body.Start_date == "") {
        return res.status(200).json({ message: "Please,Enter the Start_date" });
      } else if (req.body.End_date == "") {
        return res.status(200).json({ message: "Please,Enter the End_date" });
      } else if (datebyorder == "") {
        return res.status(200).json({ message: "Sorry,Data not found" });
      }
      return res.status(200).json(datebyorder);
    } else {
      res
        .status(200)
        .json({ status: "Please,Enter the Start_date and End_date" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "sorry,orders are not found", data: error.message });
  }
};

// -------------------------------------------create data----------------------

const createorder = async (req, res) => {
  const neworder = new Order({
    userID: req.body.userID,
    restaurantID: req.body.restaurantID,
    item: req.body.item,
    quantity: req.body.quantity,
    isPurchased: req.body.isPurchased,
    isDelivered: req.body.isDelivered,
    status: req.body.status,
    place: req.body.place,
    city: req.body.city,
    pincode: req.body.pincode,
    landmark: req.body.landmark,
    amount: req.body.amount,
  });

  try {
    const order = await neworder.save();
    res.status(200).json({ message: "order create succesfully ", data: order });
  } catch (error) {
    res.status(400).json({ message: "please,required all fields" });
  }
};
// ------------------------------update data by user----------------
const updateorderbyuser = async (req, res) => {
  try {
    const order = {
      status: req.body.status,
    };
    const order2 = await Order.findByIdAndUpdate(req.params.id, order);
    res.status(200).json({
      message: "order succesfully update ",
    });
  } catch (error) {
    res.status(400).json({ message: "sorry,order is not found" });
  }
};
// -------------------------------------------update data by staff----------------------
const updateorderbystaff = async (req, res) => {
  try {
    const order = {
      isDelivered: req.body.isDelivered,
      status: req.body.status,
    };
    const order2 = await Order.findByIdAndUpdate(req.params.id, order);
    res.status(200).json({
      message: "order succesfully update ",
    });
  } catch (error) {
    res.status(400).json({ message: "sorry,order is not found" });
  }
};

// -------------------------------------------delated data----------------------

const deleteorder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "order  succesfully delete  " });
  } catch (error) {
    res.status(400).json({ message: "sorry,order is not found" });
  }
};
module.exports = {
  getorderbystaff,
  getorderbyuser,
  getorderbyadmin,
  getallorder,
  createorder,
  updateorderbystaff,
  updateorderbyuser,
  deleteorder,
};
