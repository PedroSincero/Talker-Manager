const talkers = './talker.json';
const fs = require('fs').promises;

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

module.exports = { getTalkerID, getAllTalkers };
