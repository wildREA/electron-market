const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 3000;

//server_functions
const { handleRegisterRequest, handleLoginRequest, verifyPassword, profileSelection, carListSelection } = require('../server/server_functions');

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

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
    
    app.post('/register', async (req, res) => {
      const [result, message] = await handleRegisterRequest(req.body.username, req.body.email, req.body.password);
      return res.json({ success: result, message: message });
    });
    
    app.post('/login', async (req, res) => {
      const [result, message] = await handleLoginRequest(req.body.identifier, req.body.password);
      return res.json({ success: result, message: message });
    });
    
    // Define endpoint to return a JSON object
    app.post('/profile', async (req, res) => {
      const [result, message] = await profileSelection(req.body.username);
      return res.json({ success: result, message: message });
    });
    
    app.get('/cars', async (req, res) => {
      const data = await carListSelection(req.body);
      res.json({ success: true, data: data });
    });
    
    // Start server after everything is set up
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();