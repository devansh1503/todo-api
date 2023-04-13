const { getid } = require('../id_cnt')
const todos = require('./todo.mongo')
const mongo = require('mongodb')

async function getall(userId) {
    const data = await todos.find({userId:userId})
    return data
}
async function performance(userId){
    const res = []
    const total = await todos.count({userId:userId})
    const st = await todos.count({status:true, userId:userId})
    res.push((st/total)*100)
    for(var i=1; i<=7; i++){
        const tt = await todos.count({day:i, userId:userId})
        const sts = await todos.count({day:i, status:true, userId:userId})
        res.push((sts/tt)*100)
    }
    return res
}
async function findDay(day,userId) {
    const data = await todos.find({ day: day, userId:userId })
    return data
}
async function addTodo(data) {
    const newdata = await todos.create(data)
    return newdata
}
async function deleteOne(data, userId) {
    await todos.deleteOne({
        _id: new mongo.ObjectId(data._id),
        userId:userId
    })
}
async function changestatus(id,val,userId) {
    await todos.updateOne({
        _id: new mongo.ObjectId(id),
        userId:userId
    }, {
        status: !val
    })
}
async function getBacklog(userId){
    const data = await todos.find({
        status:false,
        userId:userId
    })
    return data
}

async function deleteAll(userId){
    await todos.deleteMany({userId:userId})
}



module.exports = {
    getall,
    findDay,
    addTodo,
    changestatus,
    deleteOne,
    performance,
    getBacklog,
    deleteAll
}