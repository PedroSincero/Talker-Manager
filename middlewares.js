const talkers = './talker.json';
const fs = require('fs').promises;
// const tokenValid = require('./token.js');

const getAllTalkers = async (req, res) => {
  const getTalker = await fs.readFile(talkers);
  const result = JSON.parse(getTalker);
  if (!result) return res.status(200).json(Array([]));
  console.log(result);
  return res.status(200).json(result);
};

// Agradecimentos a Gabriel Essenio Turma 10 Tribo B

const getTalkerID = async (req, res) => {
  const getTalker = await fs.readFile(talkers);
  const result = JSON.parse(getTalker);

  const { id } = req.params;
  const talk = result.find((talkID) => talkID.id === Number(id));
  if (!talk) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talk);
};

// const validToken = (req, res, next) => {
//   const { token } = req.headers;
//   if (token.length === 16) return res.status(200).json({ token: `${token}` });
//   next();
// };

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\w+@\w+.\w{2,4}/g;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
  return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { getTalkerID, getAllTalkers, validEmail, validPassword };
