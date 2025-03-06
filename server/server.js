const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const [result, message] = await handleRegisterRequest(username, email, password);
    return res.json({ success: result, message: message });
});


// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eam_db',
    port: 3306 // Default MySQL port
});



function handleRegisterRequest(username, email, password) {
    if (!username || !password) return [false, 'Username and password are required'];
    if (checkIfUnique(1, username) === false) return [false, 'Username must be unique'];
    if (checkIfUnique(2, email) === false) return [false, 'Email must be unique'];
}

async function checkIfUnique(type, value) {
    try {
        let query = '';
        let field = '';

        if (type === 1) {
            query = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
            field = 'Username';
        } else if (type === 2) {
            query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
            field = 'Email';
        } else {
            throw new Error('Invalid type');
        }

        const [rows] = await pool.execute(query, [value]);
        if (rows[0].count > 0) {
            return { unique: false, message: `${field} is already taken` };
        }

        return { unique: true, message: `${field} is available` };
    } catch (error) {
        console.error(error);
        return { unique: false, message: 'An error occurred while checking uniqueness' };
    }
}



