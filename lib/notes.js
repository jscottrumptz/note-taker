const fs = require('fs');
const path = require('path');

// create a new note
function createNewNote(body, db) {
    const note = body;
    // make sure the first index assigned in the forEach is 0.
    let index = -1;
    // whenever a new note is created, take all the notes and asign each an index value
    // starting from zero and incrementing by one each time.
    db.forEach(element => {
        index++         
        element.id = index.toString();
    });
    // push in the new note, it's index is equal to the db.length
    db.push(note);
    // here, we're using the fs.writeFileSync() method, which 
    // is the synchronous version of fs.writeFile() and doesn't 
    // require a callback function. if we were writing to a much 
    // larger data set, the asynchronous version would be better.
    fs.writeFileSync(
        // we want to write to our db.json file in the data subdirectory, 
        // so we use the method path.join() to join the value of __dirname, which 
        // represents the directory of the file we execute the code in, with the 
        // path to the db.json file.
        path.join(__dirname, '../db/db.json'),
        // next, we need to save the JavaScript array data as JSON, so we use JSON.stringify() 
        // to convert it. the other two arguments used in the method, null and 2, are means of 
        // keeping our data formatted. the null argument means we don't want to edit any of our 
        // existing data; if we did, we could pass something in there. the 2 indicates we want 
        // to create white space between our values to make it more readable.
        JSON.stringify(db , null , 2)
    );

    //return finished code to post route for response
    return note;
};

// delete note based on the matching id
function deleteNote(id, db) {
    const newDb = db.filter(note => note.id !== id)
    db = newDb;
    // write the file using the same method as explained above
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(db , null , 2))
    // return the new db to the delete call for res
    return newDb;
    
}

// make sure the user entered something before adding it to the db. 
// could easily add more validation here if needed.
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