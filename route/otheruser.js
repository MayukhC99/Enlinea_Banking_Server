const express= require('express');
const db= require('../database').db;
const User= require('../database').users;
const path= require('path');
const route= express.Router();

route.get('/:username',(req,res)=>{

    console.log('finding user');
      User.findOne({
        where: {
          username: req.params.username
        }
      }).then((user)=>{
        if (!user) {
          console.log('user not found');
          //next();
          //return done(null, false, {message: "No such user"})
        }

        console.log('success in finding user');
        res.sendFile(path.join(__dirname,'..','public','Account','viewusers.html'));

        //return done(null, user);
      }).catch((err)=>{
        console('user not found');
        next();
        //return done(err);
      })
})

route.get('/get_details/:username',(req,res,next)=>{

    console.log('finding user');
      User.findOne({
        where: {
          username: req.params.username
        }
      }).then((user)=>{
        if (!user) {
          console.log('user not found');
          next();
          //return done(null, false, {message: "No such user"})
        }

        console.log('success in finding user');
        return res.send({
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email_id: user.email_id,
            mobile_number: user.mobile_number,
            DOB: user.DOB,
            gender: user.gender,
            profile_picture: user.profile_picture
        });

        //return done(null, user)
      }).catch((err)=>{
        console('user not found');
        next();
        //return done(err);
      })
})


module.exports= {
    route
};