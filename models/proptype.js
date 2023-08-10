const mongoose = require("mongoose");

const PropTypeSchema = new mongoose.Schema(
  {
    type_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property_types", PropTypeSchema);
