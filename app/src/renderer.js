const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('Connected to the WebSocket server');
  socket.send('Hello from Electron!');
}

socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
}

socket.onclose = () => {
  console.log('Disconnected from the WebSocket server');
}

socket.onerror = (err) => {
  console.log('WebSocket error:', err.message);
}

// Sending data to the main process:
window.api.send('toMain', { message: 'Hello from the API, main!' });

// Receiving data from the main process:
window.api.receive('fromMain', (data) => {
  console.log('Received from main:', data);
});
