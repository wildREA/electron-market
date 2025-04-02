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

    // Assign username to the socket object and store the socket in activeUsers
    socket.username = username;
    activeUsers[username] = socket; // Store user socket
    console.log(`User ${socket.username} connected`);  // Log the actual username
}

// Handle the 'joinConversation' event
async function joinConversation(socket, data, callback) {
    const { targetUser } = data;
    const username = socket.username; // Access username from socket

    if (!targetUser) {
        return callback({ success: false, error: 'Missing required fields.' });
    }

    try {
        // Check if a channel already exists
        const channel_name = await checkForChannel(targetUser, username);
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
            const decryptedMessage = decrypt(msg.content); // Decrypt the message content
            const sender = await getUser(msg.sender_name); // Get the sender's information
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
    console.log(`Message from ${socket.username} to ${recipient}: ${message}`); // Access username from socket
    if (!recipient || !message) {
        return callback({ success: false, error: 'Recipient and message are required.' });
    }

    const sender = socket.username; // Access the sender's username
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
    const username = socket.username; // Access username from socket
    if (username) {
        delete activeUsers[username]; // Remove the user from activeUsers
    }
}

module.exports = {
    addConnection,
    joinConversation,
    handleDisconnect,
    handleMessage
};
