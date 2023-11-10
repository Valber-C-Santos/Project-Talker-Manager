const express = require('express');
const { readFiles, getTalkers, saveTalkers } = require('./utils/talkers');
const Token = require('./utils/generateToken');
const { validateEmail } = require('./utils/emailChecker');
const { validatePassword } = require('./utils/passwordChecker');
const isValidTalk = require('./utils/talkerChecker');
const isValidName = require('./utils/nameChecker');
const authenticateToken = require('./utils/tokenChecker');
const isAgeValid = require('./utils/ageChecker');
const isValidRate = require('./utils/rateChecker');
const isvalidWatchedAt = require('./utils/watchedATChecker');

const app = express();

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (req, res) => {
  try {
    const file = await readFiles();
    if (!file.length) {
      return res.status(200).json([]);
    }
    return res.status(200).json(file);
  } catch (error) {
    return null;
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getTalkers(Number(id));
    return data ? res.status(HTTP_OK_STATUS)
      .json(data) : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return null;
  }
});

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const randomToken = Token();
  return res.status(200).json({ token: randomToken });
});

app.post('/talker', authenticateToken, 
  isValidName,
  isAgeValid, 
  isValidTalk,
  isvalidWatchedAt,
  isValidRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkerFile = await readFiles();
    const talkerID = talkerFile.length + 1;
    const newTalker = {
      id: talkerID,
      name,
      age,
      talk,
    };
    await saveTalkers(newTalker);
    return res.status(201).json(newTalker);
  });

// não remova esse endpoint, ele é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
