const mongoose = require('mongoose')

const goalschema = mongoose.Schema({
    id:Number,
    goal:String,
    subtasks:[String],
    time:Number,
})

module.exports = mongoose.model('goals',goalschema)