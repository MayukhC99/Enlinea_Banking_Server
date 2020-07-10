
let socket = undefined ;

function connect_socket() {
    socket = io();
    console.log(socket);    
}

function get_socket() {
    return socket ;
}

function disconnect_socket() {
    socket.emit("terminate"); //disconnecting call to server usually when user logs out
}


module.exports = {
    connect_socket,
    get_socket,
    disconnect_socket
}

