const express= require('express');
const db= require('../database').db;
const User= require('../database').users;
const path= require('path');
const app= require('../server').app;
const route= express.Router();

//creating api to simulate node structure
route.get('/:username',(req,res,next)=>{

    console.log('finding user');
    if(req.user){

      if(req.user.username == req.params.username){
        
        res.sendFile(path.join(__dirname,'..','public','Account','index.html'));

      } else {

        User.findOne({
          where: {
            username: req.params.username
          }
        }).then((user)=>{
          if (!user) {
            console.log('user not found 1');
            res.redirect('/error_404');
            //return done(null, false, {message: "No such user"})
          }
  
          console.log('success in finding user');

          res.sendFile(path.join(__dirname,'..','public','Account','viewusers.html'));
  
          //return done(null, user);
        }).catch((err)=>{
          console.log('user not found due to error 1');
          res.redirect('/error_404');
          //return done(err);
        })

      }

    } else {

      User.findOne({
        where: {
          username: req.params.username
        }
      }).then((user)=>{
        if (!user) {
          console.log('user not found 2');
          res.redirect('/error_404');
          //return done(null, false, {message: "No such user"})
        }

        console.log('success in finding user');

        res.sendFile(path.join(__dirname,'..','public','Account','viewusers.html'));

        //return done(null, user);
      }).catch((err)=>{
        console.log('user not found due to error 2');
        res.redirect('/error_404');
        //return done(err);
      })

    }

      
})

route.post('/other_user/get_details',(req,res,next)=>{
  
  User.findOne({
    where: {
      username: req.body.otheruser
    }
  }).then((user)=>{
    if (!user) {
      console.log('user not found 2');
      res.redirect('/error_404');
      //return done(null, false, {message: "No such user"})
    }

    console.log('success in finding user');

    view_other_user= {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email_id: user.email_id,
      mobile_number: user.mobile_number,
      DOB: user.DOB,
      gender: user.gender,
      profile_picture: user.profile_picture
  };

  res.send(view_other_user);

    //return done(null, user);
  }).catch((err)=>{
    console.log('user not found due to error 2');
    res.redirect('/error_404');
    //return done(err);
  })


})


module.exports= {
    route
};