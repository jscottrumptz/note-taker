const router = require('express').Router();
const { deleteNote, createNewNote, validateNote} = require('../../lib/notes');
let db = require('../../db/db');

// get notes
router.get('/notes', (req, res) => {
    return res.json(db);
});

// delete notes
router.delete('/notes/:id', (req, res) => {
    db = deleteNote(req.params.id, db);
    res.json(db)
});

// create notes
router.post('/notes', (req,res) => {
    // req.body is where our incoming content will be
    // set id based on what the next index of the array will be
    req.body.id = db.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, db);
        res.json(note);
    }
});

module.exports  = router;