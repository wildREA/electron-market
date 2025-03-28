import { io } from "https://cdn.socket.io/4.4.0/socket.io.esm.min.js";

const socket = io('http://localhost:3001');

// Join a conversation
function joinConversation(targetUser, username, password) {
    socket.emit('joinConversation', { targetUser, username, password }, (response) => {
        if (response.success) {
            console.log('Joined conversation:', response.messages);
            displayMessages(response.messages);
        } else {
            console.error('Error joining conversation:', response.error);
        }
    });
}
// Add a variable to hold the recipient
let activeRecipient = null;

// Function to set the active recipient
function setActiveRecipient(recipient) {
    activeRecipient = recipient;
}

// Modify the sendMessage function to get the message from the document
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (!activeRecipient || !message) {
        console.error('Recipient and message are required.');
        return;
    }

    socket.emit('message', { recipient: activeRecipient, message }, (response) => {
        if (response.success) {
            console.log('Message sent successfully');
            messageInput.value = ''; // Clear the input field after sending
        } else {
            console.error('Error sending message:', response.error);
        }
    });
}

// Example usage: Set the active recipient when a user is selected
document.getElementById('userList').addEventListener('click', (event) => {
    const recipient = event.target.dataset.username;
    setActiveRecipient(recipient);
});
// Send a message
function sendMessage(recipient, message) {
    socket.emit('message', { recipient, message }, (response) => {
        if (response.success) {
            console.log('Message sent successfully');
        } else {
            console.error('Error sending message:', response.error);
        }
    });
}

// Listen for incoming messages
socket.on('message', (data) => {
    console.log('New message:', data);
    displayMessage(data);
});

function displayMessages(messages) {
    const messageContainer = document.getElementById('chatMessages');
    messages.forEach((msg) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${msg.sender}: ${msg.message}`;
        messageContainer.appendChild(messageElement);
    });
}

function displayMessage(data) {
    const messageContainer = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${data.sender}: ${data.message}`;
    messageContainer.appendChild(messageElement);
}

export { joinConversation, sendMessage };