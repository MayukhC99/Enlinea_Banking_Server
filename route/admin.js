const express= require('express');
const account_status= require('../database').account_status;
const db= require('../database').db;
const users= require('../database').users;
const route= express.Router();

//api to deactivate a user
route.post('/deactivate',(req,res)=>{

if(req.user.username && req.user.username=='admin'){
    account_status.findOne({
        where: {
            username: req.body.username
        }
    }).then((user)=>{

        if(!user){
            console.log("User doesn't exist");
            res.redirect('back');
        }

        db.query(`UPDATE deactives SET status='deactive' WHERE username='${req.body.username}'`);
        console.log('updated successfully');

        res.redirect('back');

    }).catch((err)=>{
        console.log(err);
        res.redirect('back');
    })
}
})

//api to activate a deactivated user
route.post('/activate',(req,res)=>{

if(req.user.username && req.user.username=='admin'){
    account_status.findOne({
        where: {
            username: req.body.username
        }
    }).then((user)=>{

        if(!user){
            console.log("User doesn't exist");
            res.redirect('back');
        }

        db.query(`UPDATE deactives SET status='active' WHERE username='${req.body.username}'`);
        console.log('updated successfully');

        res.redirect('back');

    }).catch((err)=>{
        console.log(err);
        res.redirect('back');
    })
}
})

//api to delete a user permanently
route.post('/delete_user',(req,res)=>{

if(req.user.username && req.user.username=='admin'){
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
        db.query(`DELETE FROM deactives WHERE username='${req.body.username}'`);
        console.log('deleted successfully');

        res.redirect('back');

    }).catch((err)=>{
        console.log(err);
        res.redirect('back');
    })
}
})


//api to show all activated users
route.get('/activate/display_users',(req,res)=>{
    if(req.user.username && req.user.username=='admin'){
        db.query(`select * from users where username <> 'admin' 
        and username in (select username from deactives where status='active')`,{ type: db.QueryTypes.SELECT }).then((rows)=>{
            res.send(rows);
        })
    }
})

//api to show all deactivated users
route.get('/deactivate/display_users',(req,res)=>{
    if(req.user.username && req.user.username=='admin'){
        db.query(`select * from users where username <> 'admin' 
        and username in (select username from deactives where status='deactive')`,{ type: db.QueryTypes.SELECT }).then((rows)=>{
            res.send(rows);
        })
    }
})

module.exports= {
    route
}