/**
 * Configuration for DB
 * field values taken from .env
 * I needed to define it as a function instead of an object because
 * enviroment variables can't be read in the object
 */

module.exports = function returnConfig() {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        waitForConnections: true,
        connectionLimit: 9,
        queueLimit: 0,
    };
    return config;
};
