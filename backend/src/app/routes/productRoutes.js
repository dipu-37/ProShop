
import express from 'express';
import { getProducts , getProductById, createProduct, updateProduct, deleteProduct, createProductReview} from '../controllers/productControllers.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/sendImageToCloudinary.js';

const router = express.Router();

// Define your product routes here

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/admin/create',protect,admin,createProduct);
router.post('/:id',protect,admin,upload.single('file'),updateProduct);
router.delete('/:id',protect,admin,deleteProduct);
router.post('/:id/reviews',protect,createProductReview);

export default router;