const express= require('express');
const passport= require('../passport');
const account_status= require('../database').account_status;
const passportEmitter= require('../passport').EventEmitter;
const route= express.Router();

route.post('/getin',passport.authenticate('local',{
    failureRedirect: '/login/failure',
    successRedirect: '/login/success'
}));

route.get('/logout',(req,res)=>{

    passportEmitter.emit("user_logout",{username: req.user.username});//emiting when loggedout
    req.logout();
    res.redirect('/');
})

route.get('/failure',(req,res)=>{
    console.log('Failed to login');
    res.send(undefined);
})
route.get('/success',(req,res)=>{
    console.log('Login Success');

    if(req.user.message==="deactivated"){
        console.log("The account has been deactivated by the admin");
        //passportEmitter.emit("user_logout",{username: req.user.username});//emiting when loggedout
        req.logout(); //logging out user if deactivated
        res.send({message: "deactive"});
    } else {
        console.log("The account is active");
        res.send({
                username:req.user.dataValues.username,
                message: "active"
                });
    }

     //checking for account status
    //  account_status.findOne({
    //     where: {
    //       username: req.user.dataValues.username
    //     }
    // }).then((account_user)=>{
    //     if(!account_user){
    //       console.log('user not found');
    //       res.send(undefined);
    //     }

    //     if(account_user.status=="deactive"){
    //       console.log("The account has been deactivated by the admin");
    //       req.logout(); //logging out user if deactivated
    //       res.send({message: "deactive"});
    //     } else {
    //       console.log("The account is active");
    //       res.send({
    //                 username:req.user.dataValues.username,
    //                 message: "active"
    //                 });
    //     }
    // }).catch((err)=>{
    //     res.send({message: "error while fetching"});
    // })

    
})

module.exports= {
    route
};