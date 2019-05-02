const serverless = require('serverless-http');
const app = require('./src/App');

module.exports.handler = serverless(app);
