const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const WebSocket = require('ws');
const { Pool } = require('pg');

// WebSocket Handlers
const {
    joinConversation,
    handleDisconnect
} = require('./websocketHandlers');

// API Handlers
const {
    handleRegisterRequest,
    handleLoginRequest,
    profileSelection,
    carListSelection,
    updateProfile,
    getProfileImage
} = require('./server_functions');

// Initialize WebSocket Service
function webSocketService() {
    const wss = new WebSocket.Server({ port: 3001 });

    wss.on('connection', (ws) => {
        // Set up WebSocket events
        ws.on('joinConversation', async (data, callback) => {
            await joinConversation(ws, data, callback);
        });

        ws.on('close', () => {
            handleDisconnect(ws);
            console.log(`Client ${ws.id} disconnected.`);
        });
    });
}

// Start Express Server
async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Database connection
    global.pool = new Pool({
        host: '172.16.3.63',
        user: 'postgres',
        password: process.env.PASSWORD,
        database: 'eam_db',
        port: 5432,
    });

    app.use(cors());
    app.use(express.json());

    app.post('/register', async (req, res) => {
        const [result, message] = await handleRegisterRequest(req.body.username, req.body.email, req.body.password);
        res.json({ success: result, message });
    });

    app.post('/login', async (req, res) => {
        const [result, message] = await handleLoginRequest(req.body.identifier, req.body.password);
        res.json({ success: result, message });
    });

    app.post('/profile', async (req, res) => {
        const [result, message] = await profileSelection(req.body.username);
        res.json({ success: result, message });
    });

    app.post('/updateProfile', async (req, res) => {
        const [result, message] = await updateProfile(
            req.body.username,
            req.body.password,
            req.body.countryCode,
            req.body.profileImage,
            req.body.biography
        );
        res.json({ success: result, message });
    });

    app.get('/cars', async (req, res) => {
        const [result, message] = await carListSelection();
        res.json({ success: result, message });
    });

    app.post('/getProfileImage', async (req, res) => {
        const data = await getProfileImage(req.body.imagePath);
        res.json({ success: true, data });
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

webSocketService();
startServer();
