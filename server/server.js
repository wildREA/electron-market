const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

//server_functions
const { handleRegisterRequest, handleLoginRequest, verifyPassword } = require('./server_functions');
const {pass} = require('./pass');

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());


// Create a connection pool
global.pool = mysql.createPool({
    host: '172.16.3.63',
    user: 'admin',
    password: pass,
    database: 'eam_db',
    port: 3306 // Default MySQL port
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const [result, message] = await handleRegisterRequest(username, email, password);
    return res.json({ success: result, message: message });
});
app.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    const [result, message] = await handleLoginRequest(identifier, password);
    return res.json({ success: result, message: message });
});

//Always make put this at bottom
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

