const express = require('express');
const { msgValidation, decryptValidation } = require('./middleware');
const pool = require('../../services/db');
const generateID = require('../../lib/rand_hex_gen');
const CrypTOR = require('../../lib/cryptor');

const app = (module.exports = express());

const cryptor = new CrypTOR();

/**
 * /api/messages
 * @async @summary Returns all the messages from the database.
 * @returns {array} an array of objects (messages).
 */
app.get('/', async (req, res) => {
    // define the query string (SELECT ALL, format timestamp as seperate DATE and TIME columns FROM messages).
    const query =
        "SELECT message_id AS messageID, original_message AS originalMessage, encrypted_message AS encryptedMessage, private_key AS privateKey, DATE_FORMAT(timestamp, '%Y-%m-%d') AS date, DATE_FORMAT(timestamp,'%H-%i-%S') AS time FROM messages";
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
 * /api/messages/:messageID/decrypt
 * @async @summary Returns a specific message's encrypted value from the database
 * @param {string} req.params.identifer the message ID or private key used to identify a message
 * @description User requests a specific message using it's unique
 * identifer(messageID or Private Key), if message
 * is found it's encrypted form gets returned and if no message is found 404 is returned.
 * @returns {string} the encrypted message.
 */
app.get('/:identifer', async (req, res) => {
    // Deconstruct the identifier from request params
    const { identifer } = req.params;
    // define the query string (SELECT ALL, format timestamp as seperate DATE and TIME columns FROM messages WHERE message id equals requested message id).
    const query =
        'SELECT encrypted_message AS encryptedMessage, message_id AS messageID FROM messages WHERE message_id = ? OR private_key = ?';
    // Query the database.
    const result = await pool(query, [identifer, identifer]);
    // If message is not found...
    if (result.length === 0)
        // ...return 404
        return res
            .status(404)
            .json('Requested message does not exist in database');
    // Else return the message.
    const { encryptedMessage, messageID } = result[0];
    return res.json({ messageID, encryptedMessage });
});

app.patch('/decrypt', decryptValidation, async (req, res) => {
    // private key to be decrypted with
    const { privateKey } = req.body;
    // encrypted message passed from 'decryptValidation' middleware
    const { encryptedMessage } = res.locals;
    // decrypt it using cryptor
    const decryptedMessage = cryptor.decrypt(privateKey, encryptedMessage);
    // return it
    return res.status(200).json({ decryptedMessage });
});
/**
 * /api/messages
 * @async @summary adds a new message to the database.
 * @returns an object with the message's id, and the encrypted message.
 */
app.post('/', msgValidation, async (req, res) => {
    // Get the original message and private key values from request body.
    const { originalMessage, privateKey } = req.body;
    try {
        // Encrypt the original message with the private key and return it.
        const encryptedMessage = cryptor.encrypt(privateKey, originalMessage);
        // Acquire a message ID
        const messageID = await generateID(10);
        // define the query string (INSERT new message).
        const query =
            'INSERT INTO messages (message_id, original_message, encrypted_message, private_key, timestamp) VALUES (?, ?, ?, ?, ?)';
        await pool(query, [
            messageID,
            originalMessage,
            encryptedMessage,
            privateKey,
            new Date(),
        ]);

        // Return the newly created messagID and encrypted message
        res.status(201).json({ messageID, encryptedMessage });
    } catch (error) {
        console.log('at POST /api/messages: ', error);
        return res
            .status(500)
            .json('server error occurred while adding message');
    }
});

module.exports = app;
