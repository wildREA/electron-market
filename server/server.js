const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// A simple API endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API with CORS!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get('register', (req, res) => {
    const { username, email, password } = req.body;
    const {result, message} = handleRegisterRequest(username, email, password);
    return res.json({ success: result, message: message });
})

function handleRegisterRequest(username, email, password) {
    if (!username || !password) return [false, 'Username and password are required'];
    if (CheckIfUnique(1, username) === false) return [false, 'Username must be unique'];
    if (checkIfUnique(2, email) === false) return [false, 'Email must be unique'];
}




