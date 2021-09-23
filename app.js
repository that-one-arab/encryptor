const express = require('express');

// /api/messages : Routes that handle messages
const messagesRoute = require('./controller/routes/messages');
// /api/generate-key : Route that handle generating keys
const generateKeyRoute = require('./controller/routes/generate_key');

// Export the server main function to be used in index.js
module.exports = function () {
    const app = express();

    // Request body parsing
    app.use(express.json());

    // Use the routes defined above
    app.use('/api/messages', messagesRoute);
    app.use('/api/generate-key', generateKeyRoute);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

    module.exports = app;
};
