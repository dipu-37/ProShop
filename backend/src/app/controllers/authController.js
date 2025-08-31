
// auth controller
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";


// @desc    Auth user & get token
// @route   POST /api/users/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials
  const user = await User.findOne({ email });
  if(user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    console.log(token)
    res.json({
        _id : user._id,
        name :user.name ,
        email : user.email,
        isAdmin : user.isAdmin,
        token : token
    })
  }else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

// @desc    Register a new user
// @route   POST /api/users/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});



// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 0
  });

  res.status(200).json({ message: "User logged out" });
});



export { loginUser, registerUser, logoutUser };