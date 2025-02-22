import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);  // Initialize Socket.IO with the server

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle a message event from the client
  socket.on('message', (data) => {
    console.log(data);
  });

  // Emit an event back to the client
  socket.emit('welcome', { message: 'Welcome to the server!' });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

