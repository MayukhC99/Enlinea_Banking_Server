const express= require('express');
const multer= require('multer');
const path= require('path');
const db= require('../database').db;
const users= require('../database').users;
const fs= require('fs');
const route= express.Router();

//Set Storage Engine
const storage_engine = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,done){

        done(null,req.user.username+'-'+Date.now()+path.extname(file.originalname));//path.extname can extract extension name from file name
    }
});

//creating fileFilter function

const customFileFilter = function(req,file,done){
    const regex= /\jpg$|\jpeg$|\png$|\gif$/

    const check_filename = regex.test(file.originalname);

    const check_mimetype= regex.test(file.mimetype);

    if(check_filename && check_mimetype){
        done(null,true);
    } else {
        done('Error: Images only');
    }
}

const upload = multer({
    storage: storage_engine,
    limits: {fileSize: 1000000},
    fileFilter: customFileFilter
}).single('profile_image');  //name should be profile_image

//handling post request containing the file(profile_picture)
route.post('/upload/profile_image',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.send(undefined);
        } else {
            if(req.file === undefined){
                res.send("undefined");
            } else {

                if(req.user.profile_picture !== '000.jpg'){
                    //deleting the file
                    fs.unlink('./public/uploads/'+req.user.profile_picture , (err) => {
                        if (err){
                            console.log(err);
                            throw err;
                        }
                        console.log('The file has been deleted');
                    });
                }
                db.query(`UPDATE users SET profile_picture="${req.file.filename}" WHERE username= "${req.user.username}"`);
                req.user.profile_picture = req.file.filename;
                res.send(req.file.filename);
            }
        }
    })
})


//to delete profile picture
route.get('/delete/profile_image',(req,res)=>{

    if(req.user.profile_picture !== '000.jpg'){
        fs.unlink('./public/uploads/'+req.user.profile_picture , (err) => {
            if (err){
                console.log(err);
                throw err;
            }
            console.log('The file has been deleted');
        });
    } else {
        res.send(undefined);
    }

    db.query(`UPDATE users SET profile_picture="000.jpg" WHERE username= "${req.user.username}"`);
    req.user.profile_picture = "000.jpg";

    res.redirect('back');
})

//get profile picture
route.get('/get/profile_picture',(req,res)=>{
  res.send(req.user.profile_picture);
})

//get user full name
route.get('/get/name',(req,res)=>{
    res.send(req.user.first_name+' '+req.user.last_name);
})

//To change password
route.post('/change/password',(req,res)=>{
    let nstr = req.body.new_password[0];
    let nstr1= req.body.new_password[1];
    let nstr2 = req.body.new_password[2];
    //let nstr= str.trim();
    if(req.user.password === nstr){
        if(nstr1 === nstr2){
            db.query(`UPDATE users SET password="${nstr2}" WHERE username="${req.user.username}"`);
            req.user.password= nstr;
        }
        else{
            res.send("Confirm password not matching with new password.");
        }
    }
    else{
        res.send("Invalid password.");
    }

    res.send("Password have successfully changed.");
})

route.get('/verify_user',(req,res)=>{
    console.log('Verifying User');
    if (req.user){
        if(req.user.dataValues.username === "admin"){
            console.log('Admin');
            res.send('admin');
        } else if(req.user.dataValues.username !== undefined) {
            console.log('user varified');
            res.send('success');
        } else{
            console.log('No user in cache');
            res.send(undefined);
        }
    }
});

module.exports= {
    route
};