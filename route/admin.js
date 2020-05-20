const express= require('express');
const account_status= require('../database').account_status;
const db= require('../database').db;
const users= require('../database').users;
const route= express.Router();

route.post('/deactivate',(req,res)=>{
    account_status.findOne({
        where: {
            username: req.body.username
        }
    }).then((user)=>{

        if(!user){
            console.log("User doesn't exist");
            res.redirect('back');
        }

        db.query(`UPDATE account_status SET status='deactive' WHERE username='${req.body.username}'`);
        console.log('updated successfully');

        res.redirect('back');

    }).catch((err)=>{
        console.log(err);
        res.redirect('back');
    })
})

route.post('/activate',(req,res)=>{
    account_status.findOne({
        where: {
            username: req.body.username
        }
    }).then((user)=>{

        if(!user){
            console.log("User doesn't exist");
            res.redirect('back');
        }

        db.query(`UPDATE account_status SET status='active' WHERE username='${req.body.username}'`);
        console.log('updated successfully');

        res.redirect('back');

    }).catch((err)=>{
        console.log(err);
        res.redirect('back');
    })
})

route.delete('/delete_user',(req,res)=>{
    account_status.findOne({
        where: {
            username: req.body.username
        }
    }).then((user)=>{

        if(!user){
            console.log("User doesn't exist");
            res.redirect('back');
        }

        db.query(`DELETE FROM users WHERE username='${req.body.username}'`);
        db.query(`DELETE FROM account_status WHERE username='${req.body.username}'`);
        console.log('deleted successfully');

        res.redirect('back');

    }).catch((err)=>{
        console.log(err);
        res.redirect('back');
    })
})

module.exports= {
    route
}