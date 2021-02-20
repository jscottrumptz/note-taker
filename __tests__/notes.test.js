const fs = require("fs");
const {deleteNote, createNewNote, validateNote} = require("../lib/notes.js");
const db = require('../db/db');

jest.mock('fs');

test("creates a note object", () => {
  const note = createNewNote(
    { title: "New Note", text: "Some text" },
    db
  );

  expect(note.title).toBe("New Note");
  expect(note.text).toBe("Some text");
});

test("validate note", () => {
  const note = {
    title: "New Note",
    text: "Some text"
  };

  const invalidNote = {
    title: "",
    text: ""
  };

  const result = validateNote(note);
  const result2 = validateNote(invalidNote);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});