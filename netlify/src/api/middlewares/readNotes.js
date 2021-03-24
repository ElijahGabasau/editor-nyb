const fs = require('fs');
const util = require('util');

module.exports = async (req, res, next) => {
  const readFile = util.promisify(fs.readFile);

  const rawNotes = await readFile('./src/api/notes.json');
  const notes = await JSON.parse(rawNotes);

  req.notes = notes;
  next()
}