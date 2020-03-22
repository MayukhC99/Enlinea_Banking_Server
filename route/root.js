const express= require('express');
const route= express.Router();

route.get('/verify_user',(req,res)=>{
    console.log('Verifying User');
    if(req.user){
        console.log('user varified');
        res.send('success');
    } else {
        console.log('No user in cache');
        res.send(undefined);
    }
});

module.exports= {
    route
};