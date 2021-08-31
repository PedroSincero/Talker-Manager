const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const { getAllTalkers, getTalkerID } = require('./middlewares');

// console.log(talkers);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// req - 1

app.get('/talker', getAllTalkers);

// req - 2
app.get('/talker/:id', getTalkerID);

app.listen(PORT, () => {
  console.log('Online');
});
