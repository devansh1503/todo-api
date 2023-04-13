const mongoose = require('mongoose')

const goalschema = mongoose.Schema({
    id:Number,
    goal:String,
    subtasks:[String],
    time:Number,
    userId:mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('goals',goalschema)