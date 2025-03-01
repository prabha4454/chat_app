import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utill.js";
import cloudinaryConfig from "../lib/cloudinary.js";
import {v2 as cloudinary} from 'cloudinary';





/* 
Post 
for sign in
 */

export const signUp = async (req, res) => {
  const { fullName, email, password ,profilePic} = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 charecters" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email is already exist" });
    }
    const salt = await bcrypt.genSalt(10); // bcrypt is an encrypting method
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic
    });

    if (newUser) {
      // gernerate jwt token here
      generateToken(newUser._id, res);

      const savedUser = await newUser.save();

      res.status(201).json(savedUser)
    }
    else{
        res.status(400).json({ message: "Failed to create user" });
    }


  } catch (error) {
    console.log("Error in signup controller :", error.message)
    res.status(500).json({ message: "Internal Server Error" });
  }
};


/* 
POST
for user LOGIN
 */
export const login = async (req, res) => {

  try{
  const { email, password } = req.body;

  const user =  await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "invalid credenttials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "invalid credetentials" });
      }
      // generate jwt token here
      generateToken(user._id, res);
      res.status(200).json(
        {
          message: "logged in successfully",
          _id : user._id,
          fullName : user.fullName,
          email : user.email,
          profilePic : user.profilePic
        }
      );
      } catch (error) {
        console.log("Error in login controller :", error.message)
        res.status(500).json({ message: "interneal server Error" });
        };
      };

      /* 
      POST
      for user LOGOUT
       */

export const logout = (req, res) => {
try {
  res.cookie("jwt", '' ,{maxAge:0});
  res.status(200).json({message:"User Logged Out Successfully"})
} catch (error) {
  console.log('Error in logout controller:', error.message);
  res.status(500).json({message:"Internal server error"})
}

};

/* 
PUT 
for update user profile
 */

export const updateProfilePic = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: req.file.path },
      { new: true }
    );

    res.status(200).json({
      message: "User Profile Updated Successfully",
      updatedUser,
    });

        } catch (error) {
          console.log('Error in update profile controller:', error.message);
          res.status(500).json({ message: "Internal server error" });
          }
      };

      /* 
      Put
      FOR UPDATING USER DETAILS 
       */
      export const updateProfileDetail = async (req, res) => {
        try {
          const user = await User.findById(req.user._id);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
            }
            const {fullName,bio } = req.body;
            if (!fullName) {
              return res.status(400).json({ message: "FullName is required" });
            };
            const userId = req.user._id;
          
            const updatedUser = await User.findByIdAndUpdate(userId, {
              fullName:fullName,
              bio:bio,
              }, { new: true });
              res.status(200).json({ message: "User Profile Details Updated Successfully" , updatedUser});
              } catch (error) {
                console.log('Error in update profile details controller:', error.message);
                res.status(500).json({ message: "Internal server error" });
                }
            };
      /*  
      GET 
      FOR  chek authentication
       */
      export const checkAuth = (req, res) => {
        try {
      
            res.status(200).json({ message: "User is authenticated" , user: req.user
            });
          
            } catch (error) {
              console.log('Error in check auth controller:', error.message);
              res.status(500).json({ message: "Internal server error" });
              }
              };
