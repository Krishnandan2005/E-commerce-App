import Product from "../models/product.models.js";

// ======================================================
// GET ALL PRODUCTS
// ======================================================

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// GET PRODUCT BY ID
// ======================================================

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({ id: id });

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
};

// ======================================================
// ADD SELLER PRODUCT
// ======================================================

export const addSellerProduct = async (req, res) => {
  try {
    const {
      sellerId,
      url,
      detailUrl,
      shortTitle,
      longTitle,
      category,
      mrp,
      cost,
      discount,
      quantity,
      description,
      tagline,
    } = req.body;

    // Check seller ID
    if (!sellerId) {
      return res.status(400).json({
        message: "Seller ID is required",
      });
    }

    // Check required fields
    if (
      !shortTitle ||
      !longTitle ||
      !category ||
      !mrp ||
      !cost ||
      quantity === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all required product fields",
      });
    }

    // Generate unique product ID
    const productId =
      "seller_" +
      Date.now() +
      "_" +
      Math.floor(Math.random() * 10000);

    const newProduct = new Product({
      id: productId,

      sellerId,

      url,
      detailUrl,

      title: {
        shortTitle,
        longTitle,
      },

      category,

      price: {
        mrp,
        cost,
        discount,
      },

      quantity,

      description,

      discount,

      tagline,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// GET SELLER PRODUCTS
// ======================================================

export const getSellerProducts = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({
        message: "Seller ID is required",
      });
    }

    const products = await Product.find({
      sellerId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE SELLER PRODUCT
// ======================================================

export const updateSellerProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { sellerId } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        message: "Seller ID is required",
      });
    }

    const product = await Product.findOne({
      id,
      sellerId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or unauthorized",
      });
    }

    const {
      url,
      detailUrl,
      shortTitle,
      longTitle,
      category,
      mrp,
      cost,
      discount,
      quantity,
      description,
      tagline,
    } = req.body;

    product.url = url;
    product.detailUrl = detailUrl;

    product.title = {
      shortTitle,
      longTitle,
    };

    product.category = category;

    product.price = {
      mrp,
      cost,
      discount,
    };

    product.quantity = quantity;
    product.description = description;
    product.discount = discount;
    product.tagline = tagline;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// DELETE SELLER PRODUCT
// ======================================================

export const deleteSellerProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { sellerId } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        message: "Seller ID is required",
      });
    }

    const product = await Product.findOne({
      id,
      sellerId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or unauthorized",
      });
    }

    await Product.deleteOne({
      id,
      sellerId,
    });

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};