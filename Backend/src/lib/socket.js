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
export const reciverScoketId = (userId)=>{
  return onlineUsers[userId]
}

io.on('connection', (socket) => {
  console.log('A user connected');


  
  //for online users
  const onlineUsers ={};
  const userId = socket.handshake.query.userId;
  
  if(userId) onlineUsers[userId]=socket.id

    // emit to all connected clients
    io.emit('onlineUsers', Object.keys(onlineUsers));


  socket.on('disconnect', () => {
 
    console.log('A user disconnected',socket.id);
    delete onlineUsers[userId];
    // emit to all connected clients
    io.emit('onlineUsers', Object.keys(onlineUsers));
  });
});

