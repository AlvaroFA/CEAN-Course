//imports
const express = require('express');
// variables globales express
var app = express();
//server
//imports del server
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const hostname = "127.0.0.1";
//peticion GET a ROOT
/*
@req request
@res pesponse
__dirname --> posicion relativa desde inicio de node
*/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//conexion del socket
io.sockets.on('connection', (socket) => {
    console.log('cliente conectado');
    socket.on("newUser",(data,callback)=>{
        console.log(data);
        socket.emit('data',{'user':data.user});
    });
    socket.on("chat",(data)=>{
        console.log(data.msg);
        io.sockets.emit('response',{'msg':data.msg});
    });
    socket.on("listUsers",(users)=>{
        users.forEach((user)=>{
            console.log(user);
            io.sockets.emit('listUsers',user);
        });
    });
});
server.listen(3000);