
import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { getProducts , getProductById} from '../controllers/productControllers.js';

const router = express.Router();

// Define your product routes here

router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;