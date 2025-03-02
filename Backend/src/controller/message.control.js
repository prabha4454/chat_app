import cloudinaryConfig from "../lib/cloudinary.js";
import { ReciverScoketId } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    if (!filteredUsers) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in fetching user for sidebar:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* 
GET
to fetch the messages between two users 
 */

export const getMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const { _id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, reciverId: userToChatId },
        { senderId: userToChatId, reciverId: loggedInUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch {
    console.log("Error in fetching messages:", error.message);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

/* 
    POST
    FOR SENDING MESSAGES AND STORING
     */

export const sendMessages = async (req, res) => {
  try {
    const senderId = req.user._id;

    const { _id: reciverId } = req.params;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const message = new Message({
      senderId: senderId,
      reciverId: reciverId,
      text,
      image: imageUrl,
    });
    const savedMessage = await message.save();

    const reciverScoketId = ReciverScoketId(reciverId);
    if (reciverScoketId) {
      io.to(reciverScoketId).emit("newMessage", savedMessage);
    }

    res.status(201).json({
      message: "Message sent successfully",
      savedMessage,
    });
  } catch (error) {
    console.log("Error in sending message controller:", error.message);
    res.status(500).json({ message: "Failed to send message" });
  }
};

/* 
    PUT 
    FOR EDITING THE MESSAGE
    */
export const editMessage = async (req, res) => {
  try {
    const { _id: messageId } = req.params;
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const { text } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { text: text },
      { new: true }
    );

    res.status(201).json({
      message: "Message edited successfully",
      updatedMessage,
    });
  } catch (error) {
    console.log("Error in editing message controller:", error.message);
    res.status(500).json({ message: "Failed to edit message" });
  }
};

/* 
DELETE
TO DELETE THE MESSAGE
 */

export const deleteMessage = async (req, res) => {
    try {
        const { _id: messageId } = req.params;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
            }
            await Message.findByIdAndDelete(messageId);
            res.status(200).json({ message: "Message deleted successfully" });
            } catch (error) {
                console.log("Error in deleting message controller:", error.message);
                res.status(500).json({ message: "Internel Server Error" });
                }
            }