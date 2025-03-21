const socket = require('ws');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 3000;

//server_functions
const { handleRegisterRequest, handleLoginRequest, profileSelection, carListSelection, updateProfile, getProfileImage } = require('../server/server_functions');

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

const wss = new socket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:3000');

// Initialize server with async DB connection
async function startServer() {
    try {
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

        app.post('logout', async (req, res) => {
            const [result, message] = await logout();
            return res.json({ success: result, message: message });
        });

        app.post('/profile', async (req, res) => {
            const [result, message] = await profileSelection(req.body.username);
            return res.json({ success: result, message: message });
        });

        app.post('/updateProfile', async (req, res) => {
            console.log(req.body.username, req.body.password,  req.body.countryCode, req.body.profileImage, req.body.description)
            const [result, message] = await updateProfile(req.body.username, req.body.password,  req.body.countryCode, req.body.profileImage, req.body.description);
            return res.json({ success: result, message: message });
        });

        app.get('/cars', async (req, res) => {
            const [result, message] = await carListSelection();
            return res.json({ success: result, message: message });
        });

        app.post('/getProfileImage', async (req, res) => {
            const data = await getProfileImage(req.body.imagePath);
            res.json({ success: true, data: data });
        });

        //Always make put this at bottom
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();