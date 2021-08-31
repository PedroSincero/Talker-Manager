const talkers = './talker.json';
const fs = require('fs').promises;

const getAllTalkers = async (req, res) => {
  const getTalker = await fs.readFile(talkers);
  const result = JSON.parse(getTalker);
  if (!result) return res.status(200).json(Array([]));
  console.log(result);
  return res.status(200).json(result);
};

module.exports = getAllTalkers;

// Agradecimentos a Gabriel Essenio Turma 10 Tribo B
