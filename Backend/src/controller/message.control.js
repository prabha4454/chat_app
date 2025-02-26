import cloudinaryConfig from "../lib/cloudinary.js";
import  {ReciverScoketId}  from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../lib/socket.js";



export const getUsersForSidebar = async (req , res ) =>{
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find( { _id: { $ne: loggedInUserId } } ).select("-password")
        if(!filteredUsers){
            return res.status(404).json({ message: "No users found" })
        }
        res.status(200).json(filteredUsers);
        } catch (error) {
            console.log("Error in fetching user for sidebar:", error.message)
            res.status(500).json({ message: "Failed to fetch users" });
            }


};

/* 
GET
to fetch the messages between two users 
 */

export const getMessages = async (req , res ) =>{
    try {
        const loggedInUserId = req.user._id
      
        const { _id:userToChatId} = req.params
        
        const messages = await Message.find({
            $or: [
              { senderId: loggedInUserId, reciverId: userToChatId },
              { senderId: userToChatId, reciverId: loggedInUserId }
            ]
          }).sort({ createdAt: 1 });
        
       res.status(200).json(messages)
    }
    catch{
        console.log("Error in fetching messages:", error.message)
        res.status(500).json({ message: "Failed to fetch messages" });
        
    }
    }

    /* 
    POST
    FOR SENDING MESSAGES AND STORING
     */

    export const sendMessages = async (req , res ) =>{
        try {
            const senderId= req.user._id;
           
            const { _id:reciverId} = req.params;
            const {text , image} = req.body;

           let imageUrl;
           if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        } 
        const message = new Message({
            senderId: senderId ,
            reciverId: reciverId ,
            text ,
            image: imageUrl ,
            })
          const savedMessage = await message.save()

//toto real time chat with socket.io
    const reciverScoketId= ReciverScoketId(reciverId);
    if(reciverScoketId){
        io.to(reciverScoketId).emit('newMessage', savedMessage);
    }

          res.status(201).json({
            message: "Message sent successfully",
            savedMessage
          });


    }
        catch(error){
            console.log("Error in sending message controller:" , error.message);
            res.status(500).json({ message: "Failed to send message" });

        }
    }
                    