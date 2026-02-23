const path = require('path');

require('dotenv').config({ path: path.join(__dirname, "../../../config/.env.auth_server") });
const PORT = process.env.AUTH_SERVER_PORT;

const express = require('express');
const app = express();
app.use(express.json());


const jwt = require('jsonwebtoken');

app.listen(PORT, err => {
    if (err) console.log(err);
    else console.log(`Server running on port ${PORT}`);
});