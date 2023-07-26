const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    city_name: {
      type: String,
      required: [true, "Please add the city name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cities", CitySchema);
