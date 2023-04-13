const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    status:Boolean,
    task:String,
    des:String,
    hrs:Number,
    day:Number,
    userId:mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('todos',todoSchema)