const fs = require('fs');
const fsP = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;

const {
    checkIfUnique,
    registerUser,
    getUserByIdentifier,
    getContact,
    getUserProfile,
    profileUpdate,
    getCarList,
    getChannel,
    createChannel,
    getMessages,
    getUserByName
} = require('./database_functions');
const { get } = require('http');

// AES-256-CBC encryption setup
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;
const key = process.env.KEY;

const ENCRYPTION_KEY = crypto.createHash('sha256')
    .update(key)
    .digest('base64').substr(0, 32); // Hash the key to ensure it's 32 bytes long

// Function to encrypt data
function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

// Function to decrypt data
function decrypt(text) {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

async function handleRegisterRequest(username, email, password) {
    if (!username || !password) return [false, 'Username and password are required'];
    try {
        // Check if username is more than 32 characters
        if (username.length > 32) return [false, 'Username must be 32 characters or less'];

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
    return bcrypt.compare(providedPassword, storedPassword);
}

async function getUserContact(username) {
    try {
        const user = await getContact(username);
        return user ? [true, user] : [false, 'User not found'];
    } catch (err) {
        console.error(err);
        return [false, 'Internal server error'];
    }
}

async function profileSelection(username) {
    try {
        if (!username) {
            return [false, 'Username is required'];
        }
        const result = await getUserProfile(username);
        if (result.success) {
            // Ensure sellerType and sellerStatus are included in the response
            const userProfile = result.message;
            userProfile.sellerType = result.message.sellerType;
            userProfile.sellerStatus = result.message.sellerStatus;
            return [true, userProfile];
        } else {
            return [false, result.message];
        }
    } catch (err) {
        return [false, 'Internal server error'];
    }
}

async function updateProfile(username, password, countryCode, profileImage, description) {
    if (!await verifyUser(username, password)) {
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
            SET country_code = ?, profile_image = ?, biography = ?
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
    try {
        const result = await getCarList();
        return result.success ? [true, result.data] : [false, 'Error fetching car list'];
    } catch (err) {
        console.error(err);
        return [false, 'Error fetching car list'];
    }
}


async function getProfileImage(username) {
    try {
        const userExists = await pingUser(username);
        if (!userExists[0]) {
            return { success: false, message: 'Username is required' };
        }
        let RelativePath = `uploads/${username}.png`;
        let filePath = path.join(__dirname, RelativePath);
        let imageBuffer = null;
        try {
            imageBuffer = await fsP.readFile(filePath);
        } 
        catch (err) {
            filePath = path.join(__dirname, 'default.jpg');
            imageBuffer = await fsP.readFile(filePath);
        }
        const base64Image = imageBuffer.toString('base64');
        return { success: true, imageBase64: base64Image };
    } catch (error) {
        console.error('Error reading image file:', error);
        return { success: false, message: 'Failed to read image file' };
    }
}

async function pingUser(username) {
    try {
        const user = await getUserByIdentifier(username);
        return user ? [true] : [false];
    } catch (error) {
        console.error(error);
        return [false];
    }
}

function generateRoomName(user1, user2) {
    // Sort usernames alphabetically
    const [firstUser, secondUser] = sortUsers(user1, user2);

    // Concatenate usernames with a separator
    return `${firstUser}***${secondUser}`;
}

function sortUsers(user1, user2) {
    return [user1, user2].sort();
}

async function checkForChannel(targetUser, username) {
    const channelName = generateRoomName(targetUser, username);

    try {
        // Attempt to retrieve the channel
        const channel = await getChannel(channelName);

        // Return an array with existence and channel name
        if (channel && channel.name) {
            return channel.name;
        } else {
            return null;
        }
    } catch (err) {
        // Handle error and return the error with the result
        return [err];
    }
}

async function saveChannel(channelName, targetUser, username) {
    await createChannel(channelName, targetUser, username);
}

async function retrieveMessages(channelName) {
    try {
        return await getMessages(channelName);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

async function getUser(username) {
    try {
        return await getUserByName(username);
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

module.exports = {
    encrypt,
    decrypt,
    handleRegisterRequest,
    handleLoginRequest,
    getUserContact,
    profileSelection,
    updateProfile,
    carListSelection,
    getProfileImage,
    verifyUser,
    pingUser,
    generateRoomName,
    checkForChannel,
    saveChannel,
    retrieveMessages,
    getUser
};
