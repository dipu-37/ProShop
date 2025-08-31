
import jwt from 'jsonwebtoken'
// generate token

const generateToken = (res,userId)=>{

  const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge : 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
}

export default generateToken;