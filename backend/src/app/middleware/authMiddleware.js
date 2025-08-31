
import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import User from '../models/userModel.js';
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  token = req.cookies.token || req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;

  // If no token, return unauthorized
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // If token is found
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});


// user must be admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };