const express = require('express');
const generateID = require('../generate_key');

const app = (module.exports = express());

/**
 * /api/messages
 * @async @summary Returns all the messages from the database.
 * @returns {array} an array of objects (messages).
 */
app.get('/', async (req, res) => {
    // define the query string (SELECT ALL, format timestamp as seperate DATE and TIME columns FROM messages).
    const query =
        "SELECT message_id, original_message, encrypted_message, private_key, DATE_FORMAT(timestamp, '%Y-%m-%d') AS date, DATE_FORMAT(timestamp,'%H-%i-%S') AS time FROM messages";
    try {
        // Query the database.
        const result = await pool(query);
        // Return the messages array.
        return res.json(result);
    } catch (error) {
        // Handle server errors
        console.log('at GET /api/messages: ', error);
        return res
            .status(500)
            .json('An error occurred while fetching your messages');
    }
});

/**
 * /api/messages/:messageID
 * @async @summary Returns a specific message from the database
 * @description User requests a specific message using it's messageID, if message
 * is found it gets returned, if no message is found 404 is returned.
 * @returns {object} object with properties relating to the message.
 */
app.get('/:messageID', async (req, res) => {
    // define the query string (SELECT ALL, format timestamp as seperate DATE and TIME columns FROM messages WHERE message id equals requested message id).
    const query =
        "SELECT message_id, original_message, encrypted_message, private_key, DATE_FORMAT(timestamp, '%Y-%m-%d') AS date, DATE_FORMAT(timestamp,'%H-%i-%S') AS time FROM messages WHERE message_id = ?";
    // Query the database.
    const result = await pool(query, [req.params.messageID]);
    // If message is not found...
    if (result.length === 0)
        // ...return 404
        return res
            .status(404)
            .json('Requested message does not exist in database');
    // Else return the message.
    return res.json(result[0]);
});

/**
 * /api/messages
 * @async @summary adds a new message to the database.
 * @returns an object with the message's id, and the encrypted message.
 */
app.post('/', async (req, res) => {
    // Get the original message and private key values from request body.
    const { originalMessage, privateKey } = req.body;
    // Encrypt the original message with the private key and return it
    const encryptedMessage = cryptor.encrypt(privateKey, originalMessage);
    // Acquire a message ID
    const messageID = generateID(10);
    try {
        // define the query string (INSERT new message).
        const query =
            'INSERT INTO messages (message_id, original_message, encrypted_message, private_key, timestamp) VALUES (?, ?, ?, ?, ?)';
        await pool(query, ['merhaba', 'there', 'my', 'fellow', new Date()]);
        res.status(201).json({ messageID, encryptedMessage });
    } catch (error) {
        console.log('at POST /api/messages: ', error);
        return res.status(500).json('server error occurred');
    }
});

module.exports = app;
