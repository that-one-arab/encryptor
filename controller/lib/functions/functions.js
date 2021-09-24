const pool = require('../../services/db');

module.exports = {
    /**
     * @function verifyUniqKey
     * @param {string} key the key to be verified again values in the database
     * @returns {boolean} returns true if key does not exist in db, returns false if key does exist in db.
     */
    verifyUniqKey: async function (key) {
        // Define the query string (select message where it's private key or message id equals the newly created key).
        const query =
            'SELECT * FROM messages WHERE private_key = ? OR message_id = ?';
        const result = await pool(query, [key, key]);
        if (result.length !== 0) return false;
        return true;
    },
};
