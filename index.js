const express = require('express');
const app = express();
const path = require('path');
const { Server } = require('socket.io');

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html')
})

const http = require('http');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle joining a room
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        socket.to(room).emit('message', `A new user has joined the room: ${room}`);
    });

    // Handle sending messages to a room
    socket.on('message', ({ room, message }) => {
        console.log(`Message to room ${room}: ${message}`);
        socket.to(room).emit('message', message);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log(`server started at port 3000`)
})
