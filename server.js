const express = require('express');
const express_sessions = require('express-session');
const passport= require('./passport');
const path= require('path');

const app= express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express_sessions({
    secret: 'SachinTendulkarIsTheBestBatsmanOfAllTime'
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname,'public')));
app.use('/signup',require('./route/signup').route);
app.use('/login',require('./route/login').route);
app.use('/root',require('./route/root').route);
app.use('/homepage',require('./route/homepage').route);
app.use('/account_user',require('./route/account_user').route);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'public','error','index.html'));
})

app.listen(port,()=>{console.log('Hosted on http://localhost:3000 ')});

module.exports={
    app
}