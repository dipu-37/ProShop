

import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    // just test now
    res.status(201).json({ message: "Order created successfully" });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
   
    // test
    res.json({ message: "My orders fetched" });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
   // test
   res.json({ message: "Order fetched" });
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
   // just test now
   res.json({ message: "Order updated to paid" });
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
   // just test now
   res.json({ message: "Order updated to delivered" });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    // just test now
    res.json({ message: "All orders fetched" });
});


export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, getAllOrders, updateOrderToDelivered };