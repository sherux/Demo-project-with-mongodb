const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },

    restaurantID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "restaurant",
    },
    item: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "item",
        },

        quantity: {
          type: Number,
        },
      },
    ],

    isPurchased: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      require: true,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ["completed", "pending", "preparing", "cancelled", "rejected"],
      },
    },
    place: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    pincode: {
      type: Number,
      require: true,
    },
    landmark: {
      type: String,
    },

    amount: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
