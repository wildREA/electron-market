const fs = require('fs');
const path = require('path');


const { checkIfUnique, registerUser, getUserByIdentifier, getUser, profileUpdate } = require('./database_functions');

async function handleRegisterRequest(username, email, password) {
    if (!username || !password) return [false, 'Username and password are required'];

    // Check username uniqueness
    const isUsernameUnique = await checkIfUnique(1, username);
    if (!isUsernameUnique) return [false, 'Username must be unique'];

    // Check email uniqueness
    const isEmailUnique = await checkIfUnique(2, email);
    if (!isEmailUnique) return [false, 'Email must be unique'];

    // Register the user if both checks pass
    const registered = await registerUser(username, email, password);
    if (registered) return [true, 'User registered successfully'];
    return [false, 'Registration failed'];
}

async function handleLoginRequest(identifier, password) {
    if (!identifier || !password) return [false, 'Identifier and password are required'];

    try {
        // Check if user exists by username or email
        const user = await getUserByIdentifier(identifier);
        if (!user) return [false, 'User not found'];

        // Verify password
        const passwordMatch = await verifyPassword(user.password, password);
        if (!passwordMatch) return [false, 'Invalid password'];

        return [true, 'Login successful'];
    } catch (error) {
        console.error(error);
        return [false, 'Login failed'];
    }
}

function verifyPassword(storedPassword, providedPassword) {
    // In real applications, use bcrypt.compare for hashed passwords
    return Promise.resolve(storedPassword === providedPassword);
}


async function profileSelection(username) {
    try {
        if (!username) {
            return [false, 'Username is required'];
        }
    } catch (error) {
        return [false, 'Internal server error'];
    }

    const query = `
        SELECT *
        FROM profiles
        WHERE username = ? OR username = ?
    `;
   // temporary fix its supposed to be  username or email.


    const result = await getUser(query, username);
    if (result.success) {
        return [true, result.message];
    } else {
        return [false, result.message];
    }
}

async function updateProfile(username, password, countryCode, profileImage, description) {
    if (!verifyUser(username, password)) {
        return [false, 'User not found'];
    }
    try {

        let imagePath = null;

        if (profileImage) {
            const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');
            imagePath = `uploads/${username}.png`; // Save as username.png

            fs.writeFileSync(path.join(__dirname, imagePath), buffer);
        }

        const query = `
            UPDATE profiles
            SET countryCode = ?, profileImage = ?, description = ?
            WHERE username = ?
        `;

        if (await profileUpdate(query, countryCode, profileImage, description, username)) {
            return [true, 'Profile updated successfully'];
        }
        else {
            return [false, 'Profile update failed']
        }
    } catch (error) {
        console.error(error);
        return [false, 'Profile update failed'];
    }
}

async function verifyUser(username, password) {
    try {
        const user = await getUserByIdentifier(username);
        if (!user) return [false, 'User not found'];

        const passwordMatch = await verifyPassword(user.password, password);
        if (!passwordMatch) return [false, 'Invalid password'];

        return [true, 'Login successful'];
    } catch (error) {
        console.error(error);
        return [false, 'Login failed'];
    }
}

module.exports = {
    handleRegisterRequest,
    handleLoginRequest,
    profileSelection,
    updateProfile
};