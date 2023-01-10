const { getid } = require('../id_cnt')
const todos = require('./todo.mongo')

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

    data.id = getid()
    await todos.updateOne({
        task: data.task
    }, data, {
        upsert: true
    })
}
async function deleteOne(id) {
    await todos.deleteOne({
        id: id 
    })
}
async function changestatus(id,val) {
    await todos.updateOne({
        id: id
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