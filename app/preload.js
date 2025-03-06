<<<<<<< HEAD
const { contextBridge, ipcRenderer } = require('electron');

// Define channels you trust for sending and receiving messages.
const validSendChannels = ['toMain'];
const validReceiveChannels = ['fromMain'];

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.warn(`Blocked send on invalid channel: ${channel}`);
    }
  },
  receive: (channel, func) => {
    if (validReceiveChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      console.warn(`Blocked receive on invalid channel: ${channel}`);
    }
  }
});
=======
const { contextBridge, ipcRenderer } = require("electron");
>>>>>>> dev_mech

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, callback) => ipcRenderer.on(channel, (_, ...args) => callback(...args)),
  profile: () => ipcRenderer.invoke("profile"),
  market: () => ipcRenderer.invoke("market"),
});
