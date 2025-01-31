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

const saveTalkers = async (talker) => {
  try {
    const data = await readFiles();
    const saveData = [...data, talker];
    await fs.writeFile(path, JSON.stringify(saveData));
  } catch (error) {
    return null;
  }
};
const talkerPut = async (talker, id) => {
  try {
    const talk = await readFiles();
    const index = talk.findIndex((ind) => ind.id === id);
    if (index === -1) {
      return null;
    }
    talk[index] = { id, ...talker };
    await fs.writeFile(path, JSON.stringify(talk));
    return true;
  } catch (error) {
    return null;
  }
};

const talkDelete = async (id) => {
  try {
    const talk = await readFiles();
    const deleteTalk = talk.filter((palestrante) => palestrante.id !== id);
    await fs.writeFile(path, JSON.stringify(deleteTalk));
  } catch (error) {
    return null;
  }
};

module.exports = {
  readFiles, 
  getTalkers,
  saveTalkers,
  talkerPut,
  talkDelete,
};
