const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { goalRoute } = require('./router/goaldata.route')
const { taskRoute } = require('./router/taskdata.route')
const mongoose = require('mongoose')
const { displaygoal } = require('./model/goalsdata')
const { addTodo, deleteAll } = require('./model/tododata')
const { getid } = require('./id_cnt')


const app = express()
app.use(cors({}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connection.once('open',()=>{
    console.log('connected')
})
mongoose.connection.on('error',()=>{
    console.log('error')
})

async function connectDb(){
    await mongoose.connect('mongodb+srv://devansh1503:bandd007@cluster0.irh8e.mongodb.net/planb?retryWrites=true&w=majority')
    app.listen(6969, ()=>{
        console.log('http://localhost:6969/')
    })
}

app.use(goalRoute)
app.use(taskRoute)
app.get('/createtodo', async (req, res)=>{
    console.log("hello")
    deleteAll()
    const gdata = await displaygoal();
    gdata.map(async (item)=>{
        const subtsk = item.subtasks
        for(var i=0; i<subtsk.length; i++){
            const newdata = {
                id:getid(),
                status:false,
                task:subtsk[i],
                des:"This task is part of goal-"+item.goal,
                hrs: (+item.time)/(+subtsk.length),
                day:i+1
            }
            await addTodo(newdata)
        }
    })
    res.send("completed")
    
})

connectDb();
