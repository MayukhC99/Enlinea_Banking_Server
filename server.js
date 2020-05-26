const express = require('express');
const express_sessions = require('express-session');
const passport= require('./passport').passport;
const passportEmitter= require('./passport').EventEmitter;
const path= require('path');
const http= require('http');
const socketio= require('socket.io');   

const app= express();
const port = process.env.PORT || 3000;
const server= http.createServer(app);
const io= socketio(server);

//app.set("socket_io",io); //now we can access io in routes using app.get
//require('./route/socket_connection');

//let user_storage={};

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express_sessions({
    secret: 'SachinTendulkarIsTheGreatestBatsmanOfAllTime'
}));
app.use(passport.initialize());
app.use(passport.session());


let id_storage= {};

io.on('connection', (socket) => {
    console.log("New socket with ID : "+socket.id);
    console.log(id_storage);

    passportEmitter.on("user_login",(data)=>{
        console.log(data.username + " connected with "+socket.id);
        console.log(id_storage);
        //user_storage[socket.id]= data.username;
        id_storage[data.username]= socket.id;

        //socket.emit("isOnline",{status: "online"});
    })

    passportEmitter.on("user_logout",(data)=>{
        if(id_storage[data.username]){
            console.log(id_storage);
            //delete user_storage[id_storage[data.username]];
            delete id_storage[data.username];

            //socket.emit("isOnline",{status: "offline"});
        }
    })

    socket.on("check_isOnline",(data)=>{
        if(id_storage[data.username])
            socket.emit("isOnline",{status: "online"});
        else
            socket.emit("isOnline",{status: "offline"});
    })

})

app.use(express.static(path.join(__dirname,'public')));
app.use('/signup',require('./route/signup').route);
app.use('/login',require('./route/login').route);
app.use('/root',require('./route/root').route);
app.use('/homepage',require('./route/homepage').route);
app.use('/admin',require('./route/admin').route);
app.use('/friend_request',require('./route/friend_request').route);
app.use('/notification',require('./route/notification').route);
app.use('/account_user',require('./route/account_user').route);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'public','error','index.html'));
})

server.listen(port,()=>{console.log('Hosted on http://localhost:3000 ')});

module.exports= {
    app
}