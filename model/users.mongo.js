const mongoose = require("mongoose")

const userSchm = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    score:Number,
    imgurl:String,
    rewardCollected:Boolean
})

module.exports = mongoose.model("users",userSchm)