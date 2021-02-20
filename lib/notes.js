const fs = require('fs');
const path = require('path');

function createNewNote(body, db) {
    const note = body;
    let index = -1;
    db.forEach(element => {
        index++         
        element.id = index.toString();
    });
    db.push(note);
    // Here, we're using the fs.writeFileSync() method, which 
    // is the synchronous version of fs.writeFile() and doesn't 
    // require a callback function. If we were writing to a much 
    // larger data set, the asynchronous version would be better.
    fs.writeFileSync(
        // We want to write to our db.json file in the data subdirectory, 
        // so we use the method path.join() to join the value of __dirname, which 
        // represents the directory of the file we execute the code in, with the 
        // path to the db.json file.
        path.join(__dirname, '../db/db.json'),
        // Next, we need to save the JavaScript array data as JSON, so we use JSON.stringify() 
        // to convert it. The other two arguments used in the method, null and 2, are means of 
        // keeping our data formatted. The null argument means we don't want to edit any of our 
        // existing data; if we did, we could pass something in there. The 2 indicates we want 
        // to create white space between our values to make it more readable.
        JSON.stringify(db , null , 2)
    );

    //return finished code to post route for response
    return note;
};

// delete note based on the index of the item with the matching id
function deleteNote(id, db) {
    const newDb = db.filter(note => note.id !== id)
    db = newDb;
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(db , null , 2))
    
    return newDb;
    
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
};

module.exports = {
    createNewNote,
    deleteNote,
    validateNote
};