const express = require('express');
const bodyParser = require('body-parser');

const { token } = require('./token.js');

console.log(token);
const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const { getAllTalkers, getTalkerID, validEmail, validPassword } = require('./middlewares');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// req - 1

app.get('/talker', getAllTalkers);

// req - 2

app.get('/talker/:id', getTalkerID);

// req - 3

app.post('/login', validEmail, validPassword, (_req, res) => res.status(200).json({ token }));

app.listen(PORT, () => {
  console.log('Online');
});
