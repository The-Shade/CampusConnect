require('dotenv').config({ path: ["../../../config/.env", "../../../config/.env.auth_server"] });

const express = require('express');
const router = express.Router();
const MongoClient = (require('mongodb')).MongoClient;
const User = require('../../../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const client = (new MongoClient(process.env.MONGODB_URI)).connect().then(value =>
    console.log(`DB Connected: ${value}`)
);
console.log(process.env.MONGODB_URI);

// User Registration
router.post('/register/', async (req, res) => {
    const user = new User(req.body.username, req.body.password, req.body.role, req.body._id);
    client.db(process.env.MONGODB_DBNAME).collection(process.env.MONGODB_USER_COLLECTION).insertOne(user.get()).then(
        result => {
            return res.status(201).json({
                message: `User registered successfully: ${result}`
                // refresh_token: jwt.sign(user.get(), process.env.JWT_REFRESH_TOKEN_SECRET)
            });
        }, error => {
            return res.status(500).json({error: `User registration failed: ${error}`});
        }
    );
});

// User Login
router.post('/login/', async (req, res) => {
    try {
        const user = await client.db(process.env.MONGODB_DBNAME).collection(process.env.MONGODB_USER_COLLECTION).findOne({_id: req.body._id});
        if (!user) {
            return res.status(401).json({error: "Authentication failed"});
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({error: "Authentication failed"});
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: "10m"
        });
        return res.status(200).json({ token });
    } catch (e) {
        return res.status(500).json({error: "Login failed"});
    }
});

module.exports = router;