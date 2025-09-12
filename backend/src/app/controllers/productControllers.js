import { json } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { sendImageToCloudinary } from "../utils/sendImageToCloudinary.js";

// @route   GET /api/products
// @desc    Get all products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//@route  post/api/products
//@desc
// create product
//access Private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  console.log(req.file);
  const payload = JSON.parse(req.body.data);
  console.log(payload);

  const product = await Product.findById(req.params.id);

  if (req.file) {
    const imageName = `${payload.name}`;
    const path = req.file?.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url;
  }

  // const { name, price, description, image, brand, category, countInStock } =
  //   req.body;
  if (product) {
    product.name = payload.name;
    product.price = payload.price;
    product.description = payload.description;
    product.image = payload.image;
    product.brand = payload.brand;
    product.category = payload.category;
    product.countInStock = payload.countInStock;
    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(req.params.id);
  if (product) {
    const product = await Product.deleteOne({ _id: id });
    res.send("Product delete successfully");
  } else {
    res.status(404);
    throw new Error("Product not fount");
  }
});

//@desc Create new review
//@router POST /api/products/:id/reviews
//@access Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviews");
    }

    const review = {
      name: req.user.name,
      rating : Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,

};
