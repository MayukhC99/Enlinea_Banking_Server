const express= require('express');
const db= require('../database').db;
const users= require('../database').users;
const friends= require('../database').friends;
const route= express.Router();

route.post('/status',(req,res)=>{
    if(req.user){
        
    }
})


module.exports={
    route
}