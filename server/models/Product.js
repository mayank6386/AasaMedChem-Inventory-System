const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    baseUnit: {
      type: String,
      enum: ["g", "kg", "mL", "L", "item"],
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    pricePerUnit: {
      type: Number,
      required: true,
    },

    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);