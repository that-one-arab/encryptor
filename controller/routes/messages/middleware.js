const { verifyUniqKey } = require('../../lib/functions/functions');
const pool = require('../../services/db');

module.exports = {
    /**
     * @async @summary Verifies the submitted request body for POST /api/messages route
     * checks for and handles duplicates, empty or unexpected values
     */
    msgValidation: async function (req, res, next) {
        const { originalMessage, privateKey } = req.body;

        console.log(req.body)

        // verify expected request body object properties.
        if (
            !req.body.hasOwnProperty('originalMessage') ||
            !req.body.hasOwnProperty('privateKey')
        )
            return res.status(406).json('Unexpected input');

        // check if input is empty
        if (!originalMessage.trim() || !privateKey.trim())
            return res.status(406).json('Empty input is not allowed');

        try {
            // Verify private key is not duplicated in DB
            const isKeyValid = await verifyUniqKey(privateKey);
            // if it is duplicated...
            if (!isKeyValid)
                return res
                    .status(409)
                    .json('This key already exists in the database');
            next();
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json('Server error while validating your input');
        }
    },

    /**
     * @async @summary Verifies the submitted request body for PATH /api/messages/decrypt/identifier route
     * checks for and handles empty or unexpected values, or if messsage does not exist in DB
     * @returns attaches an object to res.locals that contains the encrypted message so it can be decrypted
     * in the next middleware
     */
    decryptValidation: async function (req, res, next) {
        const { privateKey } = req.body;

        // verify expected request body object properties.
        if (!req.body.hasOwnProperty('privateKey'))
            return res.status(406).json('Unexpected input');

        // check if input is empty
        if (!privateKey.trim())
            return res.status(406).json('Empty input is not allowed');

        try {
            // Define the query (Select the encrypted message if private key EQUALS identifier)
            const query =
                'SELECT encrypted_message AS encryptedMessage FROM messages WHERE private_key = ?';
            const result = await pool(query, [privateKey]);

            if (result.length === 0)
                return res
                    .status(404)
                    .json('Message to be encrypted was not found');
            // if all is good attach encrypted message to res.locals and pass to the next function/middleware
            res.locals = result[0];
            next();
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json('Server error while decrypting your message');
        }
    },
};
