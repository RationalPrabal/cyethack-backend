const express = require("express");
const { productModel } = require("../models/product.model");
const { authenticate } = require("../middlewares/authenticate.middleware");
const productRouter = express.Router();

// Get All Products Route
productRouter.get("/", authenticate, async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get Product by ID Route
productRouter.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Add New Product Route
productRouter.post("/", async (req, res) => {
  try {
    const { brand, price, title, image, desc } = req.body;

    // Create new product
    const newProduct = new productModel({ brand, price, title, image, desc });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { productRouter };
