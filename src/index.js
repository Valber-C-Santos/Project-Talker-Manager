const express = require('express');
const { readFiles, getTalkers } = require('./utils/talkers');
const Token = require('./utils/generateToken');
const { validateEmail } = require('./utils/loginCheker');
const { validatePassword } = require('./utils/passwordCheker');

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

// não remova esse endpoint, ele é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
