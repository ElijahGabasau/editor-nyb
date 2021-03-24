const express = require('express')
const fs = require('fs');
const util = require('util');
const readNotes = require('../middlewares/readNotes');

const note = express.Router()

note.get('/', readNotes, async (req, res) => {
  const respond = Object.values(req.notes);
  
  res.status(200).send(respond);
});


note.delete('/:id', readNotes, async (req, res) => {
  const id = req.params.id;

  if(!req.notes[id]){
    return res.status(404).send('Not found');
  }
  
  const { [id]: respond, ...newNotes } = req.notes;
  const data = JSON.stringify(newNotes, null, 2);

  const writeFile = util.promisify(fs.writeFile);
  await writeFile('./src/api/collections/notes.json', data);

  res.status(200).send(`${respond.id}`);
});


note.patch('/:id', readNotes, async (req, res) => {
  const id = req.params.id;
  const notes = { ...req.notes};

  if(!notes[id]){
    return res.status(404).send('Not found');
  }

  //explicitly retrieve object properties, so there won't be unexpected values
  const { title, text, tags } = req.body;
  notes[id] = { id, title, text, tags};

  const data = JSON.stringify(notes, null, 2);

  const writeFile = util.promisify(fs.writeFile);
  await writeFile('./src/api/collections/notes.json', data);

  //getting respond object from updated db as it is considered a better practice  
  const readFile = util.promisify(fs.readFile); 
  const modifiedRawData = await readFile('./src/collections/notes.json');
  const modifiedData = await JSON.parse(modifiedRawData);

  if(!modifiedData[id]) {
    return res.status(500).send('Something went wrong');
  }

  res.status(200).send(modifiedData[id]);
});


note.post('/', readNotes, async (req, res) => {
  const notes = { ...req.notes};

  //since there is no much data expected, nubers are used as ids
  const maxId = Object.keys(req.notes).map(key => parseInt(key)).reduce((acc, cur) => acc > cur ? acc : cur);
  const newId = (maxId + 1).toString();

  //explicitly retrieve object properties, so there won't be unexpected values
  const { title, text, tags } = req.body;
  
  notes[newId] = { id: newId, title, text, tags };

  const data = JSON.stringify(notes, null, 2);

  const writeFile = util.promisify(fs.writeFile);
  await writeFile('./src/api/collections/notes.json', data);

  //getting respond object from updated db as it is considered a better practice 
  const readFile = util.promisify(fs.readFile); 
  const modifiedRawData = await readFile('./src/collections/notes.json');
  const modifiedData = await JSON.parse(modifiedRawData);

  if(!modifiedData[newId]) {
    return res.status(500).send('Something went wrong');
  }

  res.status(200).send(modifiedData[newId]);
});

module.exports = note;