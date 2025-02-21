import express from 'express';
import { authRoute } from '../middleware/user.authrote.js';
import { getUsersForSidebar ,getMessages , sendMessages  } from '../controller/message.control.js';
const router = express.Router()

router.get("/users", authRoute , getUsersForSidebar);

router.get('/:_id', authRoute, getMessages);

router.post('/send/:_id' , authRoute , sendMessages);

export default router;