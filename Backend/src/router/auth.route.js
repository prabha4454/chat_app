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

const router = express.Router();

router.post("/signup", signUp);

/* for login */

router.post("/login", login);

/* for logout */

router.post("/logout", logout);

/* for update user profile */
router.put("/update-userProfilePic", authRoute, updateProfilePic);
router.put("/update-userProfileDetail", authRoute, updateProfileDetail);

router.get("/check", authRoute, checkAuth); // to check authentication and also i need to learn more about this

export default router;
