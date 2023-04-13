const express = require('express');
const { newUser, loginUser } = require('../model/usersdata');
const userRoute = express.Router();

userRoute.post('/signup',async (req,res)=>{
    const data = req.body;
    const result = await newUser(data);
    req.session.userId = result._id;
    res.json(result);
})

userRoute.post('/login', async (req,res)=>{
    const data = req.body;
    const result = await loginUser(data);
    if(result.length>0){
        req.session.userId = result[0]._id;
        console.log(req.session)
        res.json(result[0]);
    }
    else res.send("not found")
})

module.exports = userRoute;