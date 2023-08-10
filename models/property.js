const mongoose = require("mongoose");

const PropertiesSchema = new mongoose.Schema(
  {
    prop_name: { type: String, default: null },
    bedroom: { type: Number, default: null },
    bathroom: { type: Number, default: null },
    parking: { type: Number, default: null },
    price: { type: Number, default: null },
    price_per: { type: String, default: null },
    currency: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Properties", PropertiesSchema);
