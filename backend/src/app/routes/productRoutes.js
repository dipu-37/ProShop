
import express from 'express';
import { getProducts , getProductById, createProduct} from '../controllers/productControllers.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define your product routes here

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/admin/create',protect,admin,createProduct);

export default router;