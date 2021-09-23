const { verifyUniqKey } = require('../../lib/functions/functions');

module.exports = {
    /**
     * @async @summary Verifies the submitted request body for POST /api/messages route
     * checks for and handles duplicates, empty or unexpected values
     */
    msgValidation: async function (req, res, next) {
        const { originalMessage, privateKey } = req.body;

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
};
