import express from "express";
import {
  signUp,
  login,
  logout,
  updateProfilePic,
  updateProfileDetail,
  checkAuth,
} from "../controller/auth.control.js";

import { authRoute } from "../middleware/user.authrote.js";
import multer from 'multer';
import path from "path"

/* 
import { fileURLToPath } from 'url';

// Convert __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Configure storage for file uploads
const storage = multer.diskStorage(
  {
    destination: path.join(__dirname,".." , 'public',"profilePic"),
    filename: (req, file, cb) => {
      console.log("hwllow")
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Multer
const upload = multer({ storage }); */


const storeFile = multer.diskStorage({
  
  
  destination: function (req, file, cb) {
    console.log("hellow")
    cb(null, "public/profilePic/");
    
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storeFile });




const router = express.Router();

router.post("/signup", signUp);

/* for login */

router.post("/login", login);

/* for logout */

router.post("/logout", logout);

/* for update user profile */
router.put("/update-userProfilePic",upload.single('profilePic'), authRoute,updateProfilePic);//toto finish the profile pic upload task
router.put("/update-userProfileDetail", authRoute, updateProfileDetail);

router.get("/check", authRoute, checkAuth); // to check authentication and also i need to learn more about this

export default router;
