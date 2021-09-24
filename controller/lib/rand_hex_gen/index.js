const { verifyUniqKey } = require('../functions/functions.js');

/**
 * @param {number} length defines the length of the returned string.
 * @returns a random hex based string who's length is defined by the 'length' parameter.
 */
module.exports = async function generateKey(length) {
    // Define an empty string.
    let str = '';
    // While the length of the string is less than the requested length.
    while (str.length < length) {
        // Add a random value to the string using a random float, turn it to
        // hex, substract the begining chars: '0.'
        str += Math.random().toString(16).substring(2);
    }
    // Once the loop condition breaks, remove all characters until it's
    // length matches the request length (in case it's length is bigger than request length)
    // and return it.
    const id = str.substring(0, length);

    try {
        // Check if the key does not already exist in the database.
        const isKeyUniq = await verifyUniqKey(id);
        // If a private key or message id with an EQUAL VALUE exists in the database,
        // rerun the function to get a different key
        if (!isKeyUniq) await generateKey(length);
        // else return the generated key
        else return id;
    } catch (error) {
        throw new Error(error);
    }
};
