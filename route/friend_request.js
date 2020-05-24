const express= require('express');
const db= require('../database').db;
const users= require('../database').users;
const friends= require('../database').friends;
const path= require('path');
const route= express.Router();

route.post('/status',(req,res)=>{

    if(req.user && req.user.message != "deactivated"){

        friends.findOne({
            where: {
                username: req.user.username,
                requested_user: req.body.username
            }
        }).then((user)=>{
            
            if(!user){
                console.log('requested user for friend request status, not found');
                res.send(undefined); //if no friend request has been sent yet
            }

            console.log('requested user for friend request status, found');
            res.send(user); // sending friend request status such as pending or accepted
        })

    } else {
        res.sendFile(path.join(__dirname,'..','public','login','login.html'));
    }
})




module.exports={
    route
}