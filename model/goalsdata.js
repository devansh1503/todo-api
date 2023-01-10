const goals = require('./goals.mongo')

async function addgoal(data){
    await goals.updateOne({
        goal:data.goal
    }, data, {
        upsert:true
    })
}

async function displaygoal(){
    const data =  await goals.find()
    return data
}

async function deletegoal(id){
    await goals.deleteOne({
        id: id
    })
}

module.exports = {
    addgoal,
    displaygoal,
    deletegoal
}













// // const gdata = [{ "id": 1, "goal": "Do some DSA questions", "subtasks": ["LinkedList", " Trees", " Graph", " DFS BFS", " Stack/Queue", " Dynamic Programming", " Strings"], "time": "21", "priority": 1 }, { "id": 2, "goal": "Build Plan B project", "subtasks": ["Integrate Mongo DB", " Build Performance page", " Change some Logic", " Build Notes Page", " Enhance CSS"], "time": "21", "priority": 1 }, { "id": 3, "goal": "Write an ariticle", "subtasks": ["You are stuck in back-seat", " Draft 2", " Do some improvements", " Final Draft"], "time": "5", "priority": 1 }]

// module.exports = {
//     gdata
// }