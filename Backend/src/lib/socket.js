import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server ,{
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});  // Initialize Socket.IO with the server
export const ReciverScoketId = (userId)=>{
  return (onlineUsers[userId])
}
const onlineUsers ={};
io.on('connection', (socket) => {
  console.log('A user connected');


  
  //for online users
  
  const userId = socket.handshake.query.userId
  
  if(userId) onlineUsers[userId]=socket.id

    // emit to all connected clients
    io.emit('onlineUsers', Object.keys(onlineUsers));
    console.log(userId)
    console.log(onlineUsers)


  socket.on('disconnect', () => {
 
    console.log('A user disconnected',socket.id);
    delete onlineUsers[userId];
    // emit to all connected clients
    io.emit('onlineUsers', Object.keys(onlineUsers));
  });
});

