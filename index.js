const express = require('express');
require('dotenv').config();

const dummyData = require('./dummydata');
const app = express();

app.use(express.json());

app.get('/api/messages', (req, res) => {
    console.log('working');
    return res.json(dummyData);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
