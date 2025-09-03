import {addOrderItems,getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import express from 'express';
const router = express.Router();


router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);
router.get("/", protect, admin, getAllOrders);


export default router;