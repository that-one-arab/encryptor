const express = require('express');

// /api/messages : Routes that handle messages
const messagesRoute = require('./controller/routes/messages');
// /api/generate-key : Route that handle generating keys
const generateKeyRoute = require('./controller/routes/generate_key');

const app = express();

// Request body parsing
app.use(express.json());

// Use the routes defined above
app.use('/api/messages', messagesRoute);
app.use('/api/generate-key', generateKeyRoute);

// CHANGE ME
module.exports = app;
