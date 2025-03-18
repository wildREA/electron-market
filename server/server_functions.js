const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { checkIfUnique, registerUser, getUserByIdentifier, getUser, profileUpdate, getCarList } = require('./database_functions');

async function handleRegisterRequest(username, email, password) {
    if (!username || !password) return [false, 'Username and password are required'];
    try {
        // Check username uniqueness
        const isUsernameUnique = await checkIfUnique(1, username);
        if (!isUsernameUnique) return [false, 'Username must be unique'];

        // Check email uniqueness
        const isEmailUnique = await checkIfUnique(2, email);
        if (!isEmailUnique) return [false, 'Email must be unique'];

        // Hasing password with bcrypt using salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Register the user if both checks pass
        const registered = await registerUser(username, email, hashedPassword);
        return registered ? [true, 'User registered successfully'] : [false, 'Registration failed'];
    } catch (error) {
        console.error('Error during registration:', error);
        return [false, 'An error occurred during registration'];
    }
}

async function handleLoginRequest(identifier, password) {
    if (!identifier || !password) return [false, 'Identifier and password are required'];
    try {
        // Check if user exists by username or email
        const user = await getUserByIdentifier(identifier);
        if (!user) return [false, 'User not found'];

        // Verify password
        const passwordMatch = await verifyPassword(user.password, password);
        return passwordMatch ? [true, 'Login successful'] : [false, 'Invalid password'];
    } catch (err) {
        console.error(err);
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
    } catch (err) {
        return [false, 'Internal server error'];
    }
    const result = await getUser(username);
    return result.success ? [true, result.message] : [false, result.message];
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

        return await profileUpdate(query, countryCode, imagePath, description, username) ? [true, 'Profile updated successfully'] : [false, 'Profile update failed'];
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
        return passwordMatch ? [true, 'Login successful'] : [false, 'Invalid password'];
    } catch (error) {
        console.error(error);
        return [false, 'Login failed'];
    }
}

async function carListSelection() {
    const result = await getCarList();
    return result.success ? [true, result] : [false, result];
}

module.exports = {
    handleRegisterRequest,
    handleLoginRequest,
    verifyPassword,
    profileSelection,
    updateProfile,
    carListSelection
};
