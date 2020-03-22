const express= require('express');
const passport= require('../passport');
const route= express.Router();

route.post('/getin',passport.authenticate('local',{
    failureRedirect: '/login/failure',
    successRedirect: '/login/success'
}));

route.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

route.get('/failure',(req,res)=>{
    console.log('Failed to login');
    res.send(undefined);
})
route.get('/success',(req,res)=>{
    console.log('Login Success');
    res.send(req.user);
})

module.exports= {
    route
};