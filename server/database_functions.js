async function checkIfUnique(type, value) {
    try {
        let query = '';
        if (type === 1) {
            query = 'SELECT COUNT(*) AS count FROM users WHERE username = $1';
        } else if (type === 2) {
            query = 'SELECT COUNT(*) AS count FROM users WHERE email = $1';
        } else {
            throw new Error('Invalid type');
        }
        const result = await pool.query(query, [value]);
        return parseInt(result.rows[0].count, 10) === 0;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function registerUser(username, email, password) {
    try {
        let query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        await pool.query(query, [username, email, password]);

        query = 'INSERT INTO profiles (username) VALUES ($1)';
        await pool.query(query, [username]);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function getUserByIdentifier(identifier) {
    try {
        const query = 'SELECT * FROM users WHERE username = $1 OR email = $2 LIMIT 1';
        const result = await pool.query(query, [identifier, identifier]);
        return result.rows[0] || null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getUserProfile(identifier) {
    try {
        const query = 'SELECT * FROM profiles WHERE username = $1';
        const result = await pool.query(query, [identifier]);
        if (!result.rows || result.rows.length === 0) {
            return { success: false, message: 'No user found' };
        }
        const user = { ...result.rows[0] };
        delete user.user_id;
        return { success: true, message: user };
    } catch (err) {
        return { success: false, message: 'Query error', err };
    }
}

async function profileUpdate(query, countryCode, profileImage, description, username) {
    try {
        await pool.query(query, [countryCode, profileImage, description, username]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function getCarList() {
    try {
        const query = 'SELECT * FROM cars';
        const result = await pool.query(query);
        return { success: true, data: result.rows };
    } catch (err) {
        console.error(err);
        return { success: false, error: err };
    }
}

module.exports = {
    checkIfUnique,
    registerUser,
    getUserByIdentifier,
    getUserProfile,
    profileUpdate,
    getCarList
};
