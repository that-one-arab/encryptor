const express = require('express');
const helmet = require('helmet');
const compression = require('compression')
// /api/messages : Routes that handle messages
const messagesRoute = require('./controller/routes/messages');
// /api/generate-key : Route that handle generating keys
const generateKeyRoute = require('./controller/routes/generate_key');

const app = express();

// Request body parsing
app.use(express.json());
// Render react build from client/build directory.
app.use(express.static(__dirname + '/client/build'));
// Protects again well known vulnerabilities by setting certain headers
app.use(helmet());
// Compresses responses
app.use(compression());

// Use the routes defined above
app.use('/api/messages', messagesRoute);
app.use('/api/generate-key', generateKeyRoute);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

module.exports = app;
