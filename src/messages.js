import DynamoDB from 'aws-sdk/clients/dynamodb';
import { v4 as createID } from 'uuid';
import { byTimestamp } from './sortHelpers';

const MESSAGES_TABLE = process.env.MESSAGES_TABLE;

const dynamoDb = new DynamoDB.DocumentClient();

export const getMessage = (req, res) => {
  const params = {
    TableName: MESSAGES_TABLE,
    Key: {
      id: req.params.id,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      res.status(400).json({ error: 'Could not get message' });
    }

    if (result.Item) {
      const { id, message, user, timestamp } = result.Item;
      res.json({ id, message, user, timestamp });
    } else {
      res.status(404).json({ error: "Message not found" });
    }
  });
};

export const listMessages = (req, res) => {
  const params = {
    TableName: MESSAGES_TABLE,
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      res.status(400).json({ error: 'Could not list messages' });
    }

    console.log(`Found ${result.Count} messages`);
    const { Items, Count } = result;

    res.json({ messages: Items.sort(byTimestamp), count: Count});
  })
};

const validate = (req, res) => {
  const { message, user } = req.body;
  console.info('body', req.body);

  if (typeof message !== 'string') {
    console.error(`Message was not a string, instead it was ${typeof message}`);
    res.status(400).json({ error: '"message" must be a string' });
    return false;
  }
  else if (typeof user !== 'string') {
    console.error(`User was not a string, instead it was ${typeof user}`);
    res.status(400).json({ error: '"user" must be a string' });
    return false;
  }

  return true;
};

export const createMessage = (req, res) => {
  if (!validate(req, res)) {
    console.warn('Request was invalid, failing.');
    return;

  }

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
      console.error(error);
      res.status(400).json({ error: 'Could not create message' });
    }
    res.json(Item);
  });
};
