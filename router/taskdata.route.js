const express = require('express');
const { getall, findDay, changestatus, deleteOne, performance, getBacklog, addTodo } = require('../model/tododata')

taskRoute = express.Router()

taskRoute.get('/todo',async(req,res)=>{
    const data = await getall(req.session.userId);
    res.json(data)
})
taskRoute.get('/todo/perform', async (req,res)=>{
    const data = await performance(req.session.userId);
    res.json(data)
})
taskRoute.get('/todo/backlog', async(req,res)=>{
    const data = await getBacklog(req.session.userId)
    res.json(data)
})
taskRoute.get('/todo/:day',async(req,res)=>{
    const day = req.params.day
    const data = await findDay(day, req.session.userId);
    res.json(data)
})
taskRoute.get('/changestatus/:id',async(req,res)=>{
    const id = req.params.id
    changestatus(id,true,req.session.userId)
    res.send("Changed")
})
taskRoute.get('/changestatuscross/:id',async(req,res)=>{
    const id = req.params.id
    changestatus(id,false,req.session.userId)
    res.send("Changed")
})
taskRoute.post('/todo/delete', async (req,res)=>{
    const data = req.body
    await deleteOne(data, req.session.userId)
    res.send('deleted')
})
taskRoute.post('/todo/addnew', async(req,res)=>{
    const data = req.body
    await addTodo(data)
})
module.exports = {
    taskRoute,
}