import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const authRoute = async (req, res, next) => {
  try {
    /* to verify the token */
    
    
    const token = req.cookies.jwt
    if (!token) return res.status(401).send("Access denied. No token provided");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).send("Access denied. Invalid token");
    }
    /* to check the user is exist in database */
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).send("Access denied. User not found");
    }
    req.user = user;
   
    next();
  } catch (error) {
    console.log("Error in authentication middleware :", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};
