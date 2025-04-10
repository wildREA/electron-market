import { io } from "https://cdn.socket.io/4.4.0/socket.io.esm.min.js";
import { createMessage } from "./chat.js";

// Fetch username and password from your application's context
const socket = io('http://localhost:3001', {
    auth: {
        username: window.scriptParams.username,
        password: window.scriptParams.password
    }
});
window.scriptParams = {};

// Log connection status
socket.on('connect', () => {
    console.log(`WebSocket connected with ID: ${socket.id}`);
    addUserListEventListener();
});

socket.on('disconnect', (reason) => {
    console.log(`WebSocket disconnected: ${reason}`);
});

// Join a conversation
function joinConversation(targetUser) {
    console.log(`Attempting to join conversation with target user ${targetUser}`);
    socket.emit('joinConversation', { targetUser }, (response) => {
        if (response.success) {
            console.log(`Joined conversation with ${targetUser}. Messages received:`, response.messages);
            displayMessages(response.messages);
        } else {
            console.error(`Error joining conversation: ${response.error}`);
        }
    });
}

// Modify the sendMessage function to get the message from the document
export function sendMessage(recipient = window.activeRecipient) {
    const messageInput = document.querySelector("input[name='message']");
    const message = messageInput.value;

    if (!message) {
        console.error('Message was not found');
        return;
    }

    if (!recipient) {
        console.error('Recipient not found');
        return;
    }

    console.log(`Sending message to ${recipient}: ${message}`);
    socket.emit('message', { recipient: recipient, message }, (response) => {
        if (response.success) {
            console.log('Message sent successfully');
            messageInput.value = ''; // Clear the input field after sending
        } else {
            console.error(`Error sending message: ${response.error}`);
        }
    });
}

function displayMessages(messages) {
    messages.forEach((message) => {
        createMessage(message); // Assuming createMessage is a function that handles displaying the message
    });
}

// Add event listener to the user list container
function addUserListEventListener() {
    document.getElementById('userListContainer').addEventListener('click', (event) => {
        const recipient = event.target.closest('.user-item').dataset.userId; // Corrected to use closest user-item
        console.log(`User selected: ${recipient}`);
        joinConversation(recipient);
    });
}

// Listen for incoming messages
socket.on('message', (data) => {
    console.log('New message received:', data);
    createMessage(data);
});

