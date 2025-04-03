const {
    verifyUser,
    checkForChannel,
    generateRoomName,
    saveChannel,
    retrieveMessages,
    decrypt,
    getUser,
    pingUser,
    encrypt,
} = require('./server_functions');

const {
    saveMessage
} = require('./database_functions');

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
        const channel_name = await checkForChannel(targetUser, username);
        let conversationName = channel_name || generateRoomName(username, targetUser);

        if (!channel_name) {
            const isUser = await pingUser(targetUser);
            if (!isUser) {
                return callback({ success: false, error: 'Invalid user.' });
            }
            await saveChannel(conversationName, targetUser, username);
        }

        // Store the conversation name in the socket object
        socket.channel = conversationName; // Store one channel only.

        // Retrieve and send earlier messages
        const earlierMessages = await retrieveMessages(conversationName);

        const messages = earlierMessages.map((msg) => {
            const decryptedMessage = decrypt(msg.content);
            return { sender: msg.sender_name, message: decryptedMessage };
        });

        callback({ success: true, messages });
    } catch (error) {
        console.error('Error during conversation join:', error);
        callback({ success: false, error: error.message });
    }
}

// Handle incoming messages (direct messaging, no rooms)
async function handleMessage(socket, data, callback) {
    const { recipient, message } = data;
    console.log(`Message from ${socket.username} to ${recipient}: ${message}`);
    if (!recipient || !message) {
        return callback({ success: false, error: 'Recipient and message are required.' });
    }

    const sender = socket.username;
    const recipientSocket = activeUsers[recipient];
    if (recipientSocket) {
        recipientSocket.emit('message', { sender, message});
        callback({ success: true });
    } else {
        callback({ success: true, error: 'Recipient is offline.' });
    }

    socket.emit('message', { sender, message });

    //save message
    let channel = socket.channel || generateRoomName(sender, recipient);
    const encryptedMessage = encrypt(message);
    saveMessage(channel, encryptedMessage, sender)
        .then(() => {
            console.log('Message saved successfully.');
        })
        .catch((error) => {
            console.error('Error saving message:', error);
        });
}

// Handle disconnection event
function handleDisconnect(socket) {
    const username = socket.username;
    if (username) {
        delete activeUsers[username];
        if (socket.channel) {
          console.log(`User ${username} disconnected from channel: ${socket.channel}`);
          //Perform any channel cleanup here.
        }
    }
}

// Helper function to get a user's channel
function getUserChannel(username) {
    const socket = activeUsers[username];
    if (socket && socket.channel) {
        return socket.channel;
    }
    return null; // Return null if the user or channel doesn't exist.
}

module.exports = {
    addConnection,
    joinConversation,
    handleDisconnect,
    handleMessage,
    getUserChannel
};