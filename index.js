import serverless from 'serverless-http';
import app from './src/App';

export const handler = serverless(app);
