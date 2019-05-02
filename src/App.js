const bodyParser = require('body-parser');
const express = require('express');
const { getMessage, createMessage } = require('./messages');

const app = express();

app.use(bodyParser.json({ strict: false }));

app.get('/messages/:id', getMessage);

app.post('/messages', createMessage);

module.exports = app;
