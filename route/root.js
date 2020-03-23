const express= require('express');
const multer= require('multer');
const path= require('path');
const db= require('../database').db;
const sequelize= require('sequelize')
const route= express.Router();

//Set Storage Engine
const storage_engine = multer.diskStorage({
    destination: '../public/uploads/',
    filename: function(req,file,done){

        done(null,req.user.username+path.extname(file.originalname));//path.extname can extract extension name from file name
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
    limits: {fileSize: 5000000}, 
    fileFilter: customFileFilter
}).single('profile_image');  //name should be profile_image

//handling post request containing the file(profile_picture)
route.post('/upload/profile_image',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.send(undefined);
        } else {
            if(req.file === undefined){
                res.send(undefined);
            } else {
                const str= '.\\uploads\\'+req.file.filename;
                db.query(`UPDATE users SET profile_picture=${req.file.filename} WHERE username= ${req.user.username}`);
                res.send(str);
            }
        }
    })
})



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