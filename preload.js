// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Send a message to the main process on allowed channels only
  send: (channel, data) => {
    const validChannels = ['toMain']; // whitelist channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // Receive messages from the main process on allowed channels only
  receive: (channel, callback) => {
    const validChannels = ['fromMain']; // whitelist channels
    if (validChannels.includes(channel)) {
      // Forward the event's data to the provided callback function
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
});
