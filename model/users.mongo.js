const mongoose = require("mongoose")

const userSchm = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = mongoose.model("users",userSchm)