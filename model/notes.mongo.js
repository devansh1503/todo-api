const mongoose = require('mongoose')

const noteschm = mongoose.Schema({
    title:{type:String, index:'text'},
    content:String,
    userId:mongoose.Schema.Types.ObjectId,
    userName:String,
    date:Date
})


module.exports = mongoose.model('note',noteschm)
