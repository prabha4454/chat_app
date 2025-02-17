import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import connectDB from "../lib/db.js"
import {createServer} from "http"
import {Server} from "socket.io"
import messageroutes from "../routes/message.route.js"
import { Socket } from "dgram";
import {Message} from "../model/message.model.js"
dotenv.config();

const PORT = process.env.PORT || 3000

connectDB();
const app = express()

app.use(cors())

const server = createServer(app)
const io = new Server(server)

/* for router api */

app.use("/" ,messageroutes);

/* socket io */



// Handle client connections and disconnections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Example of receiving and emitting messages
  socket.on('chat message',async (message) => {
    const newMessage = new Message(message);
    await newMessage.save();
    io.emit('chat-message', message);
  });
});


app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})