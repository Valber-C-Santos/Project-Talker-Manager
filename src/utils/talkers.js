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

const getTalkers = async () => {
  const data = await readFiles();
  return data;
};

module.exports = {
  readFiles, 
  getTalkers,
};
