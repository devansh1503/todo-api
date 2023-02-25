const { getid } = require('../id_cnt')
const todos = require('./todo.mongo')
const mongo = require('mongodb')

async function getall() {
    const data = await todos.find({})
    return data
}
async function performance(){
    const res = []
    const total = await todos.count({})
    const st = await todos.count({status:true})
    res.push((st/total)*100)
    for(var i=1; i<=7; i++){
        const tt = await todos.count({day:i})
        const sts = await todos.count({day:i, status:true})
        res.push((sts/tt)*100)
    }
    return res
}
async function findDay(day) {
    const data = await todos.find({ day: day })
    return data
}
async function addTodo(data) {
    const newdata = await todos.create(data)
    return newdata
}
async function deleteOne(data) {
    await todos.deleteOne({
        _id: new mongo.ObjectId(data._id)
    })
}
async function changestatus(id,val) {
    await todos.updateOne({
        _id: new mongo.ObjectId(id)
    }, {
        status: !val
    })
}
async function getBacklog(){
    const data = await todos.find({
        status:false
    })
    return data
}

async function deleteAll(){
    await todos.deleteMany({})
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