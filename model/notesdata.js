const notesMongo = require("./notes.mongo");

async function addNotes(data){
    const newnote = await notesMongo.create(data);
    return newnote;
}

async function getNotes(id){
    const notes = await notesMongo.find({userId:id})
    return notes;
}

async function searchNotes(searchq){
    // notesMongo.createIndexes({title:'index'})
    const notes = await notesMongo.find({$text : {$search : searchq }})
    return notes;
}

module.exports = {
    addNotes,
    getNotes,
    searchNotes
}