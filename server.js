const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { goalRoute } = require('./router/goaldata.route')
const { taskRoute } = require('./router/taskdata.route')
const mongoose = require('mongoose')
const { displaygoal } = require('./model/goalsdata')
const { addTodo, deleteAll } = require('./model/tododata')
const { getid } = require('./id_cnt')
const userRoute = require('./router/userdata.route')
const session = require("express-session")

const app = express()
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true,
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connection.once('open', () => {
    console.log('connected')
})
mongoose.connection.on('error', () => {
    console.log('error')
})

async function connectDb() {
    await mongoose.connect('mongodb+srv://devansh1503:bandd007@cluster0.irh8e.mongodb.net/planb?retryWrites=true&w=majority')
    app.listen(6969, () => {
        console.log('http://localhost:6969/')
    })
}

app.use(session({
    name:"mylogin",
    secret: 'devanshplanb',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:60000, httpOnly:false}
}));
app.use(goalRoute);
app.use(taskRoute);
app.use(userRoute);
app.get("/checkCookie", (req,res)=>{
    if(req.session.userId){
        res.send("exits")
    }
    else{
        res.send("not exists")
    }
})
app.get('/createtodo', async (req, res) => {
    deleteAll(req.session.userId)
    const gdata = await displaygoal(req.session.userId );
    gdata.map(async (item) => {
        const subtsk = item.subtasks
        for (var i = 0; i < subtsk.length; i++) {
            const newdata = {
                id: getid(),
                status: false,
                task: subtsk[i],
                des: "This task is part of goal-" + item.goal,
                hrs: (+item.time) / (+subtsk.length),
                day: i + 1,
                userId:req.session.userId,
            }
            await addTodo(newdata)
        }
    })
    res.send("completed")

})

connectDb();
