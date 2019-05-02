const bodyParser = require('body-parser');
const express = require('express');
const AWS = require('aws-sdk');
const createID = require('uuid/v4');

const MESSAGES_TABLE = process.env.MESSAGES_TABLE;

const app = express();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/messages/:id', function (req, res) {
  const params = {
    TableName: MESSAGES_TABLE,
    Key: {
      id: req.params.id,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get message' });
    }

    if (result.Item) {
      const { id, message, user, timestamp } = result.Item;
      res.json({ id, message, user, timestamp });
    } else {
      res.status(404).json({ error: "Message not found" });
    }
  });
});

function validate(req, res) {
  const { message, user } = req.body;

  if (typeof message !== 'string') {
    res.status(400).json({ error: '"message" must be a string' });
  }
  else if (typeof user !== 'string') {
    res.status(400).json({ error: '"user" must be a string' });
  }
}

app.post('/messages', function (req, res) {
  validate(req, res);

  const { message, user } = req.body;

  const Item = {
    id: createID(),
    user: user,
    message: message,
    timestamp: Date.now(),
  };

  console.info('Creating new message: ', JSON.stringify(Item));

  const params = {
    TableName: MESSAGES_TABLE,
    Item,
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create message' });
    }
    res.json(Item);
  });
});

module.exports = app;
