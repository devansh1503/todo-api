const express = require('express')
const {addgoal, displaygoal, deletegoal} = require('../model/goalsdata')

const goalRoute = express.Router()

goalRoute.get('/goals',async (req,res)=>{
    const data = await displaygoal(req.session.userId)
    res.json(data)
})
goalRoute.post('/goals',async (req,res)=>{
    const newdata = req.body
    await addgoal(newdata)
})
goalRoute.get('/goals/delete/:id',async (req,res)=>{
    const id = +req.params.id
    await deletegoal(id, req.session.userId)
})

module.exports = {
    goalRoute
}