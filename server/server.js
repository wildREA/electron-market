const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

//server_functions
const { handleRegisterRequest, handleLoginRequest, verifyPassword, profileSelection } = require('../server/server_functions');
const { pass } = require('../server/pass');

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

// Define endpoint to return a JSON object
app.post('/profile', async (req, res) => {
    console.log("1");
    try {
        const username = req.body;
        console.log("2");
        if (!username) {
            return res.status(400).json({ success: false, error: "Username is required" });
        }
        console.log("3");
        const { result, message } = await profileSelection(username);
        console.log("4");
        if (!result) {
            return res.status(404).json({ success: false, error: message || "User not found" });
        }
        console.log("5");
        return res.status(200).json({ success: true, message });
    } catch (error) {
        console.log("FINAL");
        console.error("Server error:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

//Always make put this at bottom
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
