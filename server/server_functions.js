const { checkIfUnique, registerUser, getUserByIdentifier, getUser, getCarList } = require('./database_functions');

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
    if (result.success) {
        return [true, result.message];
    } else {
        return [false, result.message];
    }
}

async function carListSelection() {
    const result = await getCarList();
    if (result.success) {
        return [true, result.message];
    } else {
        return [false, result.message];
    }
}

module.exports = {
    handleRegisterRequest,
    handleLoginRequest,
    verifyPassword,
    profileSelection,
    carListSelection
};
