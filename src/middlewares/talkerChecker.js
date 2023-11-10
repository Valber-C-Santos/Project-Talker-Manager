const isValidTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
  }

  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  
  if (!talk.watchedAt.trim()) {
    return res.status(400).json({ message: 'O campo "watchedAt" não pode estar vazio' });
  }

  next();
};

module.exports = isValidTalk;