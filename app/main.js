const { app, BrowserWindow, ipcMain  } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        fullscreen: true,
        icon: path.join(__dirname, "images/icons/app_icon.png"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Preload is used correctly
            contextIsolation: true,  // Must be `true` for `contextBridge`
            nodeIntegration: false,   // Keep disabled for security (preload exposes necessary APIs unless setup for valid channels)
            sandbox: false,           // Disable sandbox to allow `ipcRenderer`
        },
    });

    win.loadFile("index.html");
}

// Called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// On macOS, recreate a window when the dock icon is clicked
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle("profile", async () => {
    win.loadFile("profile.html");
});

ipcMain.handle("market", async () => {
    win.loadFile("index.html");
});
