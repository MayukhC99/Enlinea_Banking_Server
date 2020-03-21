const express = require('express');
const express_sessions = require('express-session');
const passport= require('./passport');
const path= require('path');

const app= express();


app.use(express.static(path.join(__dirname,'public')));


app.use((req,res)=>{
    res.send(`<h1>Error: 404 File Not Found !!!</h1>`)
})

app.listen(3000,()=>{console.log('Hosted on http://localhost:3000 ')});