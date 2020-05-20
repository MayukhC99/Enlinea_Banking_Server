const express= require('express');
const account_status= require('../database').account_status;
const db= require('../database').db;
const users= require('../database').users;
const route= express.Router();

route.post('/deactive',(req,res)=>{
    
})


module.exports= {
    route
}