const express= require('express');
const app= require('../server').app;
const passportEmitter= require('../passport').EventEmitter;
const route= express.Router();

const io= app.get("socket_io");

user_storage={};

io.on("connection",(socket)=>{
    console.log("New socket with ID : "+socket.id);

    passportEmitter.on("user_login",(data)=>{
        user_storage[socket.id]= data.username;
    })


})



module.exports= {
    route,
    user_storage
}
