const express= require('express');
const db= require('../database').db;
const notification= require('../database').notification;
const route= express.Router();

route.get('/getall',(req,res)=>{
    if(req.user && req.user.message != "deactivated"){
        console.log("Getting all notifications");
        notification.findAll({
            where: {
                username: req.user.username
            }
        }).then((user)=>{

            if(user.length === 0){
                console.log('No notification found');
                res.send('No notification');
            }
            else {
                console.log("Notification found");
                res.send(user);
            }
        })
    }
})


module.exports = {
    route
}
