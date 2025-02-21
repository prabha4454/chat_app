import express from "express";
import {
  signUp,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controller/auth.control.js";

import { authRoute } from "../middleware/user.authrote.js";

const router = express.Router();

router.post("/signup", signUp);

/* for login */

router.post("/login", login);

/* for logout */

router.post("/logout", logout);

/* for update user profile */
router.put("/update-userProfile", authRoute, updateProfile);

router.get("/check", authRoute, checkAuth); // to check authentication and also i need to learn more about this

export default router;
