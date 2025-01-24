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
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', message);
    })
});

server.listen(3000, () => {
    console.log(`server started at port 3000`)
})
