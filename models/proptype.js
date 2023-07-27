const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    type_name: {
      type: String,
      required: [true, "Please add the city name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property_types", CitySchema);
