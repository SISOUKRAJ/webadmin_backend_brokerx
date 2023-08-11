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
    property_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property_types",
      default: "",
    },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "Cities", default: "" },
    listing: [{ type: String, default: null }],
    amenities: [{ type: String, default: null }],
    gallery: [{ name: { type: String, default: null } }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Properties", PropertiesSchema);
