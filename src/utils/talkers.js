const fs = require('fs').promises;
const { join } = require('path');

const path = join(__dirname, '..', 'talker.json');

const readFiles = async () => {
  try {
    const data = await fs.readFile(path);
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const getTalkers = async (id) => {
  const data = await readFiles();
  const foundTalkers = data.find((talker) => talker.id === id);
  return foundTalkers;
};

module.exports = {
  readFiles, 
  getTalkers,
};
