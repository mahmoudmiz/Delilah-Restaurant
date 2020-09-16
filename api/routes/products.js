const express = require("express");
const router = express.Router();
const Product = require("./../../models/Product");
const userAuth = require("../middleware/user-auth");
const adminAuth = require("./../middleware/admin-auth");

// get all products
router.get("/", userAuth, async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).json({ products: allProducts });
  } catch (err) {
    if (err.errors && err.errors[0].message) {
      return res.status(500).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// get product by id
router.get("/:productId", userAuth, async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findByPk(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    if (err.errors && err.errors[0].message) {
      return res.status(500).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// add new product
router.post("/", adminAuth, async (req, res) => {
  try {
    const { name, price, img, description } = req.body;
    const createdProduct = await Product.create({
      name,
      price,
      img,
      description,
    });
    if (createdProduct) {
      res.status(201).json(createdProduct);
    }
  } catch (err) {
    if (err.errors && err.errors[0].message) {
      return res.status(500).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// update product
router.patch("/:productId", adminAuth, async (req, res) => {
  try {
    const id = req.params.productId;
    const { name, price, img } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      if (name || price || img) {
        if (name) product.name = name;
        if (price) product.price = price;
        if (img) product.img = img;
        const updatedProduct = await product.save();
        res.status(200).json({ message: "Product updated successfully!" });
      } else {
        res.status(404).json({
          message: "Missing fields , please provide name or price or img",
        });
      }
    }
  } catch (err) {
    if (err.errors && err.errors[0].message) {
      return res.status(500).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete product
router.delete("/:productId", adminAuth, async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: "product not found" });
    } else {
      const deletedProduct = await product.destroy();
      res.status(200).json({ message: "product deleted!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
