const express = require('express');
const app= express();
const path= require('path');

app.use(express.static(path.join(__dirname,'public')));


app.use((req,res)=>{
    res.send(`<h1>Error: 404 File Not Found !!!</h1>`)
})

app.listen(3000,()=>{console.log('Hosted on http://localhost:3000 ')});