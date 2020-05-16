const express= require('express');
const users= require('../database').users;
const route= express.Router();

route.post('/getin',(req,res)=>{
    users.create({
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_id: null,
        mobile_number: null,
        DOB: null,
        gender: null,
        profile_picture: '000.jpg',
        notification: 0
    }).then((created_user)=>{
        if(created_user){
            res.send(created_user);
        } else {
            res.send(undefined);
        }
    }).catch((err)=>{
        res.send(undefined);
    })
})


module.exports= {
    route
};