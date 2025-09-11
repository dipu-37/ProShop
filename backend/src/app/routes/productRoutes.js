
import express from 'express';
import { getProducts , getProductById, createProduct, updateProduct} from '../controllers/productControllers.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/sendImageToCloudinary.js';

const router = express.Router();

// Define your product routes here

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/admin/create',protect,admin,createProduct);
router.post('/:id',protect,admin,upload.single('file'),updateProduct);

export default router;