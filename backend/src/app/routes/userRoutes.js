
import express from 'express';
import { getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} from '../controllers/userControllers.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/profile', protect, admin, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id', protect, admin, updateUser);


export default router;

