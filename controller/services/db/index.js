const mysql = require('mysql2/promise');
const config = require('./config');

/**
 * @summary A HOC function that takes an SQL statement and it's parameters as
 * arguments, handle boilerplate logic and returns the query's result.
 * @param {string} sql The SQL statement to be used in the database.
 * @param {array} params Array of statement prepared parameters.
 * @returns response from the database.
 */
async function pool(sql, params = null) {
    try {
        const connection = await mysql.createPool(config());
        const [response] = await connection.execute(sql, params);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = pool;
