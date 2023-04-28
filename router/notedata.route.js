const express = require('express');
const { addNotes, getNotes, searchNotes } = require('../model/notesdata');

const notesRouter = express.Router();

notesRouter.get('/notes', async (req, res) => {
    try {
        const result = await getNotes(req.session.userId);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.send("failed")
    }

})

notesRouter.post('/notes', async (req, res) => {
    try {
        var data = req.body;
        data['userId'] = req.session.userId;
        const result = await addNotes(data);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send("failed")
    }

})

notesRouter.get('/searchnotes', async (req,res)=>{
    const searchq = req.query.search;
    const results = await searchNotes(searchq)
    res.json(results)
})

module.exports = {
    notesRouter
}