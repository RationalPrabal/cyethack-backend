const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const productModel = mongoose.model("product", productSchema);
module.exports = {
  productModel,
};
