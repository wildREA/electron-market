const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 3000;

//server_functions
const { handleRegisterRequest, handleLoginRequest, profileSelection, updateProfile } = require('../server/server_functions');

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Create a connection pool
global.pool = mysql.createPool({
    host: '172.16.3.63',
    user: 'admin',
    password: process.env.PASSWORD,
    database: 'eam_db',
    port: 3306 // Default MySQL port
});

console.log(process.env.PASSWORD)

app.post('/register', async (req, res) => {
    const [result, message] = await handleRegisterRequest(req.body.username, req.body.email, req.body.password);
    return res.json({ success: result, message: message });
});

app.post('/login', async (req, res) => {
    const [result, message] = await handleLoginRequest(req.body.identifier, req.body.password);
    return res.json({ success: result, message: message });
});

app.post('/profile', async (req, res) => {
    const [result, message] = await profileSelection(req.body.username);
    return res.json({ success: result, message: message });
});

app.post('/updateProfile', async (req, res) => {
    console.log(req.body.username, req.body.password,  req.body.countryCode, req.body.profileImage, req.body.description)
    const [result, message] = await updateProfile(req.username, req.password,  req.body.countryCode, req.body.profileImage, req.body.description);
    return res.json({ success: result, message: message });
});

//Always make put this at bottom
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
