
import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
const router = express.Router();

// Define your product routes here

router.get('/', asyncHandler(async (req, res) => {
 const products = await Product.find({});
  res.send(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send('Product not found');
    }
}));

export default router;