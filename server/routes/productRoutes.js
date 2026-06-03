const express = require("express");
const Product = require("../models/Product");

const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/*
CREATE PRODUCT
POST /api/products
*/
router.post("/", auth, admin, async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      baseUnit,
      stock,
      pricePerUnit,
      description,
    } = req.body;

    if (
      !name ||
      !sku ||
      !category ||
      !baseUnit ||
      stock === undefined ||
      pricePerUnit === undefined
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingProduct = await Product.findOne({ sku });

    if (existingProduct) {
      return res.status(400).json({
        message: "SKU already exists",
      });
    }

    const product = await Product.create({
      name,
      sku,
      category,
      baseUnit,
      stock,
      pricePerUnit,
      description,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
GET ALL PRODUCTS
GET /api/products
*/
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
SEARCH PRODUCTS
GET /api/products/search/:keyword
*/
router.get("/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          sku: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          category: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
GET SINGLE PRODUCT
GET /api/products/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
UPDATE PRODUCT
PUT /api/products/:id
*/
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
DELETE PRODUCT
DELETE /api/products/:id
*/
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;