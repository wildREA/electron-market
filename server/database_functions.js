async function checkIfUnique(type, value) {
    try {
        let query = '';
        if (type === 1) {
            query = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
        } else if (type === 2) {
            query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
        } else {
            throw new Error('Invalid type');
        }
        const [rows] = await pool.execute(query, [value]);
        return rows[0].count === 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function registerUser(username, email, password) {
    try {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await pool.execute(query, [username, email, password]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getUserByIdentifier(identifier) {
    try {
        const query = 'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1';
        const [rows] = await pool.execute(query, [identifier, identifier]);
        return rows[0] || null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getUser(username) {
    try {
        const query = `SELECT * FROM profiles WHERE username = ?`;
        const [results] = await pool.execute(query, [username]);
        if (!results || results.length === 0) {  // Security against invalid user
            return { success: false, message: "No user found" };
        }
        const user = { ...results[0] };
        delete user.user_id;
        return { success: true, message: user };
    } catch (err) {
        return { success: false, message: "Query error", err };
    }
}

async function getCarList() {
    try {
        const list = {};
        const query = `SELECT * FROM profiles WHERE username = ?`;
        await pool.execute(query);
        // Add line to sort database values from columns into variables inside list
        return list;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    checkIfUnique,
    registerUser,
    getUserByIdentifier,
    getUser,
    getCarList
}
