const express= require('express');
const Op = require('../database').Op;
const db= require('../database').db;
const users= require('../database').users;
const friends= require('../database').friends;
const route= express.Router();

route.get('/all_friends', (req,res) =>{
    if(req.user.username){
        friends.findAll({
            where: {
                [Op.or]: [{username: req.user.username}, {requested_user: req.user.username}],
                status: 'accepted'
            }
        }).then((user)=>{

            if(!user){
                console.log('requested user for all friends, not found');
                res.send(undefined);
            }else{
                let search = new Array();
                let request_search = new Array();
                search = user.map(u=>u.username);
                search = search.filter(item => item !== req.user.username);
                request_search = user.map(u=>u.requested_user);
                request_search = request_search.filter(item => item !== req.user.username);
                if (request_search.length != 0)
                    search.push(request_search);
                users.findAll({
                    where: {
                        username: {
                            [Op.in]: search
                        }
                    }
                }).then((all_user)=>{
                    if(!user){
                        console.log('requested user for all friends, not found');
                        res.send(undefined);
                    }else{
                        console.log('requested user for all friends, found');
                        res.send(all_user);
                    }
                })
                //res.send(user);
            }
        })
    }
    else{
        res.send(undefined);
    }
})

route.get('/friend_requests', (req,res) =>{
    if(req.user.username){
        friends.findAll({
            where: {
                requested_user: req.user.username,
                status: 'pending'
            }
        }).then((user)=>{

            if(!user){
                console.log('requested user for respond to friend request, not found');
                res.send(undefined);
            }else{
                let search = new Array();
                search = user.map(u=>u.username);
                users.findAll({
                    where: {
                        username: {
                            [Op.in]: search
                        }
                    }
                }).then((all_user)=>{
                    if(!user){
                        console.log('requested user for respond to friend request, not found');
                        res.send(undefined);
                    }else{
                        console.log('requested user for respond to friend request, found');
                        res.send(all_user);
                    }
                })
            }
        })
    }
    else{
        res.send(undefined);
    }
})

route.get('/sent_request', (req,res) =>{
    if(req.user.username){
        friends.findAll({
            where: {
                username: req.user.username,
                status: 'pending'
            }
        }).then((user)=>{

            if(!user){
                console.log('requested user for sent request, not found');
                res.send(undefined);
            }else{
                let search = new Array();
                search = user.map(u=>u.requested_user);
                users.findAll({
                    where: {
                        username: {
                            [Op.in]: search
                        }
                    }
                }).then((all_user)=>{
                    if(!user){
                        console.log('requested user for respond to friend request, not found');
                        res.send(undefined);
                    }else{
                        console.log('requested user for respond to friend request, found');
                        res.send(all_user);
                    }
                })
            }
        })
    }
    else{
        res.send(undefined);
    }
})

module.exports = {
    route
}