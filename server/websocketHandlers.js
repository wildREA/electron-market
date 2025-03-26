const {
    verifyUser,
    checkForChannel,
    generateRoomName,
    saveChannel,
    retrieveMessages,
    decrypt,
    findUserById,
    pingUser
} = require('./server_functions');

const socketConversations = {};

// Handle the 'joinConversation' event
async function joinConversation(ws, data, callback) {
    const { targetUser, username, password } = data;

    // Validate inputs
    if (!targetUser || !username || !password) {
        return callback({ success: false, error: 'Missing required fields.' });
    }

    // Verify user credentials
    if (!(await verifyUser(username, password))) {
        return callback({ success: false, error: 'Invalid user credentials.' });
    }

    try {
        // Leave the previous conversation if any
        if (socketConversations[ws.id]) {
            const previousConversation = socketConversations[ws.id];
            ws.leave(previousConversation);
        }

        // Check if a channel already exists
        const { channel_name } = await checkForChannel(targetUser, username);
        let conversationName;

        if (channel_name) {
            conversationName = channel_name;
        } else {
            // Validate the target user
            const isUser = await pingUser(targetUser);
            if (!isUser) {
                return callback({ success: false, error: 'Invalid user.' });
            }
            conversationName = generateRoomName(username, targetUser);
            await saveChannel(conversationName, targetUser, username);
        }

        // Join the user to the conversation
        socketConversations[ws.id] = conversationName;
        ws.join(conversationName);

        // Retrieve and send earlier messages
        const earlierMessages = await retrieveMessages(conversationName);
        const messages = await Promise.all(earlierMessages.map(async (msg) => {
            const decryptedMessage = decrypt(msg.message);
            const sender = await findUserById(msg.user_id);
            return { sender, message: decryptedMessage };
        }));

        callback({ success: true, conversation: conversationName, messages });

    } catch (error) {
        console.error('Error during conversation join:', error);
        callback({ success: false, error: error.message });
    }
}

// Handle the WebSocket disconnection event
function handleDisconnect(ws) {
    if (socketConversations[ws.id]) {
        delete socketConversations[ws.id];
    }
}

module.exports = {
    joinConversation,
    handleDisconnect
};
