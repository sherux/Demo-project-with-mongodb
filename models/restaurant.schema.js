const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const restaurantschema = new mongoose.Schema(
  {
    restaurant_name: {
      type: String,
      require: true,
    },

    restaurant_address: {
      type: String,
      require: true,
    },

    restaurant_phone_number: {
      type: String,
      require: true,
    },
    restaurant_location: {
      type: pointSchema,
      required: true,
    },
    restaurant_status: {
      type: [
        {
          type: String,
          enum: ["open(09:00 AM TO 10:00 PM)", "close(10:00 PM TO 09:00 AM ) "],
          require: true,
        },
      ],
    },

    restaurant_description: {
      type: String,
      require: true,
    },
    restaurant_ratings: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("restaurant", restaurantschema);
