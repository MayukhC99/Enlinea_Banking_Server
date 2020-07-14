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
let page_storage= {};

io.on('connection', (socket) => {
    console.log("New socket with ID : "+socket.id);
    console.log(id_storage);

    socket.on("user_login",(data)=>{
        console.log(data + " connected with " + socket.id);
        //if( ! id_storage.hasOwnProperty(data) )
        id_storage[data] = socket.id;
        console.log(id_storage);
        console.log(page_storage);

        socket.broadcast.emit("alter_isOnline",{status: "online", username: data});
    })


    socket.on("user_logout",(data)=>{
        if(id_storage[data]){
            delete id_storage[data];
            if(page_storage.data.main === true)
                delete page_storage.data;
            console.log(id_storage);
            console.log(page_storage);

            socket.broadcast.emit("alter_isOnline",{status: "offline" , username: data});
        }
    })

    socket.on("check_isOnline",(data)=>{
        if(id_storage[data.username])
            socket.emit("isOnline",{status: "online"});
        else
            socket.emit("isOnline",{status: "offline"});
    })

    //username and page_name 
    socket.on("remove_page",(data)=>{
        console.log("Inside remove page socket event");
        if(id_storage[data.username]){
            if(page_storage[data.username][data.page_name])
                delete page_storage[data.username][data.page_name];
            console.log(page_storage[data.username]);
            if(Object.keys(page_storage[data.username]).length === 0){
                delete page_storage[data.username];
                delete id_storage[data.username];
                console.log("all pages closed");
                console.log(page_storage);
                console.log(id_storage);
                socket.broadcast.emit("alter_isOnline",{status: "offline" , username: data.username});
            }
        }
    })

    socket.on("add_page",(data)=>{
        console.log("adding page in storage");
        if(data.username){
            id_storage[data.username] = socket.id;
            if(page_storage[data.username])
                page_storage[data.username][data.page_name] = true;
            else {
                page_storage[data.username] = {};
                page_storage[data.username][data.page_name] = true;
                socket.broadcast.emit("alter_isOnline",{status: "online" , username: data.username});
            }
            console.log(page_storage);
        }
    })

    socket.on("disconnect",()=>{
        console.log(socket.id + " disconnected");
    })
})

app.use(express.static(path.join(__dirname,'public')));
app.use('/signup',require('./route/signup').route);
app.use('/login',require('./route/login').route);
app.use('/root',require('./route/root').route);
app.use('/homepage',require('./route/homepage').route);
app.use('/admin',require('./route/admin').route);
app.use('/friend_request',require('./route/friend_request').route);
app.use('/friends',require('./route/friends').route);
app.use('/notification',require('./route/notification').route);
app.use('/account_user',require('./route/account_user').route);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'public','error','index.html'));
})

server.listen(port,()=>{console.log('Hosted on http://localhost:3000 ')});

module.exports= {
    app
}