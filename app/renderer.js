// Sending data to the main process:
window.api.send('toMain', { message: 'Hello from the API, main!' });

// Receiving data from the main process:
window.api.receive('fromMain', (data) => {
  console.log('Received from main:', data);
});
