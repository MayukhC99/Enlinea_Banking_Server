const express= require('express');
const app= require('../server').app;
const passportEmitter= require('../passport').EventEmitter;
const route= express.Router();

const io= app.get("socket_io");

user_storage={};
id_storage={};

io.on("connection",(socket)=>{
    console.log("New socket with ID : "+socket.id);

    passportEmitter.on("user_login",(data)=>{
        console.log(data.username + " connected with "+socket.id);
        user_storage[socket.id]= data.username;
        id_storage[data.username]= socket.id;

        socket.emit("isOnline",{status: "online"});
    })

    passportEmitter.on("user_logout",(data)=>{
        if(id_storage[data.username]){
            delete user_storage[id_storage[data.username]];
            delete id_storage[data.username];

            socket.emit("isOnline",{status: "offline"});
        }
    })


})



module.exports= {
    route,
    user_storage
}
