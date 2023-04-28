const express = require('express');
const { newUser, loginUser, userImage, addScore, collectReward } = require('../model/usersdata');
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
userRoute.post('/image', async (req,res)=>{
    const url = req.body.url;
    await userImage(url,req.session.userId);
    res.send("uploaded")
})

userRoute.post('/score', async (req,res)=>{
    const score = req.body.score;
    const result = await addScore(score,req.session.userId);
    res.send(result)
})

userRoute.get('/reward', async(req,res)=>{
    await collectReward(req.session.userId, true)
    res.send('reward updated');
})
module.exports = userRoute;