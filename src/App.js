import { json } from 'body-parser';
import express from 'express';
import cors from 'cors';
import { getMessage, createMessage, listMessages } from './messages';

const app = express();

app.use(json());
app.use(cors());

app.get('/messages/:id', getMessage);

app.get('/messages', listMessages);

app.post('/messages', createMessage);

export default app;
