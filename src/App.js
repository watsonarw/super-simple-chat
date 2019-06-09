import { json } from 'body-parser';
import express from 'express';
import cors from 'cors';
import { getMessage, createMessage, listMessages } from './messages';
import { addContentTypeIfNotDefined } from './middleware';

const app = express();

app.use(addContentTypeIfNotDefined('application/json'));
app.use(json());
app.use(cors());

app.get('/messages/:id', getMessage);

app.get('/messages', listMessages);

app.post('/messages', createMessage);

export default app;
