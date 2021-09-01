const talkers = './talker.json';
const fs = require('fs').promises;

const error401 = 401;
const error400 = 400;

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

const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(error401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(error401).json({ message: 'Token inválido' });
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
     return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(error400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(error400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res
    .status(error400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
   }
  next();
};

const validRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(error400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(error400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  // const { id } = req.id;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!regex.test(watchedAt)) {
     return res
     .status(error400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = { 
  getTalkerID,
getAllTalkers,
validEmail,
  validPassword,
validToken,
validName,
validAge,
validTalk,
validRate,
validWatchedAt,
};

// Agradecimentos A https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656
