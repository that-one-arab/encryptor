const express = require('express');
const generateID = require('../../lib/rand_hex_gen');

const app = (module.exports = express());
/**
 * /api/generate-key
 * @returns a 16 digit key/id
 */
app.get('/', async (req, res) => {
    try {
        const id = await generateID(16);
        return res.json(id);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server error while generating a key');
    }
});
