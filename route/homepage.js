const express= require('express');
const nodemailer= require('nodemailer');
const route= express.Router();

let ouremail= 'enlineabanking@gmail.com';
let ourpassword= 'enlineabanking2020';

//creating transporter for mail transfer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ouremail,
      pass: ourpassword
    }
});

route.post('/contact_us_email',(req,res)=>{
    let name= req.body.name;
    let phone= req.body.phone;
    let email= req.body.email.trim();
    let subject= req.body.subject;
    let msg= req.body.msg;

    let mailOptions = {
        from: ouremail,
        to: ouremail,
        subject: 'Contact US - ' + subject,
        text: `Name: ${name}\nMobile: ${phone}\nEmail: ${email}\nMessage: ${msg}`
    };

    let mailOptions2 = {
        from: ouremail,
        to: email,
        subject: 'Thank You',
        text: `Thank You for contacting us. Our team will soon get in touch with you.`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    transporter.sendMail(mailOptions2, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('back');
});



module.exports= {
    route
};


