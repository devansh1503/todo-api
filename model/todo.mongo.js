const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    id:Number,
    status:Boolean,
    task:String,
    des:String,
    hrs:Number,
    day:Number,
})

module.exports = mongoose.model('todos',todoSchema)