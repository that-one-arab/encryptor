require('dotenv').config();
const pool = require('./controller/services/db');
const startServer = require('./app.js');

/**
 * @summary Tries connecting to the DB before starting server
 */
async function connectDB() {
    let retries = 5;
    while (retries) {
        try {
            await pool('SELECT NOW()');
            console.log('Database connection established');
            // Start the express server
            startServer();
            break;
        } catch (error) {
            console.log('Could not connect to database: ', error);
            retries -= 1;
            console.log('retries left: ' + retries);
            await new Promise((res) => setTimeout(res, 5000));
        }
    }
}

/**
 * @summary MAIN entry function
 * Establishes a database connection
 */
(async function () {
    await connectDB();
})();
