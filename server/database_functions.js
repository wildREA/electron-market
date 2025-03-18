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
        let query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await pool.execute(query, [username, email, password]);

        query = 'INSERT INTO profiles (username) VALUES (?)';
        await pool.execute(query, [username]);

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

async function getUserProfile(identifier) {
    try {
        //select from profile
        query = 'SELECT * FROM profiles WHERE username = ? ';
        const [results] = await pool.execute(query, [identifier])
        if (!results || results.length === 0) {
            return { success: false, message: "No user found" };
        }
        const user = { ...results[0] };
        delete user.user_id;
        return { success: true, message: user };
    } catch (err) {
        return { success: false, message: 'Query error', err };
    }
}

async function getCarList() {
    try {
        const query = `SELECT * FROM cars`;
        const [results] = await pool.execute(query);
        return { success: true, data: results };
    } catch (err) {
        console.error(err);
        return { success: false, error: err };
    }
}

async function profileUpdate(query, countryCode, profileImage, description, username) {
    console.log(`Sql part now:
    query: ${query}
    countryCode: ${countryCode}
    profileImage: ${profileImage}
    description: ${description}
    username: ${username}`);

    console.log("image: " + profileImage)
    try {
        await pool.execute(query, [countryCode, profileImage, description, username]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}



module.exports = {
    checkIfUnique,
    registerUser,
    getUserByIdentifier,
    getUserProfile,
    profileUpdate
}
