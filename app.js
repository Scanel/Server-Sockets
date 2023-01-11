const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: '*',
    withCredentials: false
});
const port = 3002;

io.on('connection', (socket) => {
    socket.on('join', (data) =>{
        const roomName = data.roomName;
        console.log(roomName);
        socket.join(roomName);
        socket.to(roomName).emit('new-user', data);
        // socket.join(roomName);
        // socket.to(roomName).broadcast.emit('new-user', data);

        socket.on('disconnect', () => {
            socket.to(roomName).emit('bye-user', data);
            console.log(data);
        })

        socket.on('chat', (data) => {
            socket.to(roomName).emit('chat-user', data);
        })

        socket.on('avatar', (data) => {
            socket.to(roomName).emit('avatar-user', data);
        })

        socket.on('tarea', (data) =>{
            socket.to(roomName).emit('tarea-user', data);
        })

        socket.on('respuesta', (data) => {
            socket.to(roomName).emit('respuesta-user', data);
        })

        console.log("Usuario conectado", data);
    })
})
server.listen(port, () =>{
    console.log(`Server running port ${port}`);
})