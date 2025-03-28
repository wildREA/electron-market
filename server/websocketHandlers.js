const {
    verifyUser,
    checkForChannel,
    generateRoomName,
    saveChannel,
    retrieveMessages,
    decrypt,
    getUser,
    pingUser,
    encrypt
} = require('./server_functions');

const activeUsers = {}; // Store active users and their sockets

// Handle connection: authenticate user and store socket
async function addConnection(socket) {
    const { username, password } = socket.handshake.auth;
    if (!(await verifyUser(username, password))) {
        socket.disconnect();
        return;
    }

    activeUsers[username] = socket; // Store user socket
    console.log(`User ${username} connected`);
}

// Handle the 'joinConversation' event
async function joinConversation(socket, data, callback) {
    const { targetUser, username, password } = data;

    if (!targetUser || !username || !password) {
        return callback({ success: false, error: 'Missing required fields.' });
    }

    try {
        // Check if a channel already exists
        const { channel_name } = await checkForChannel(targetUser, username);
        let conversationName = channel_name || generateRoomName(username, targetUser);

        if (!channel_name) {
            const isUser = await pingUser(targetUser);
            if (!isUser) {
                return callback({ success: false, error: 'Invalid user.' });
            }
            await saveChannel(conversationName, targetUser, username);
        }

        // Retrieve and send earlier messages
        const earlierMessages = await retrieveMessages(conversationName);
        const messages = await Promise.all(earlierMessages.map(async (msg) => {
            const decryptedMessage = decrypt(msg.message);
            const sender = await getUser(msg.sender_name);
            return { sender, message: decryptedMessage };
        }));

        callback({ success: true, messages });
    } catch (error) {
        console.error('Error during conversation join:', error);
        callback({ success: false, error: error.message });
    }
}

// Handle incoming messages (direct messaging, no rooms)
async function handleMessage(socket, data, callback) {
    const { recipient, message } = data;
    console.log(`Message from ${socket.id} to ${recipient}: ${message}`);
    if (!recipient || !message) {
        return callback({ success: false, error: 'Recipient and message are required.' });
    }

    const sender = Object.keys(activeUsers).find(user => activeUsers[user] === socket);
    if (!sender) {
        return callback({ success: false, error: 'User not found.' });
    }

    const recipientSocket = activeUsers[recipient];
    if (recipientSocket) {
        recipientSocket.emit('message', { sender, message });
        callback({ success: true });
    } else {
        callback({ success: false, error: 'Recipient is offline.' });
    }
}

// Handle disconnection event
function handleDisconnect(socket) {
    const username = Object.keys(activeUsers).find(user => activeUsers[user] === socket);
    if (username) {
        delete activeUsers[username];
    }
}

module.exports = {
    addConnection,
    joinConversation,
    handleDisconnect,
    handleMessage
};