const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'images/icons/app_icon.png'),
    webPreferences: { // Development
      // Production settings (nodeIntegration and contextIsolation values during development)
      nodeIntegration: true, // Enable Node.js integration in the renderer process
      contextIsolation: false, // Isolate the context to protect against prototype pollution
      preload: path.join(__dirname, 'preload.js'), // Use a preload script to expose only safe APIs

      // Additional settings
      enableRemoteModule: false, // Disable the remote module unless explicitly needing it
      sandbox: true, // Enable sandbox mode for extra security
      webSecurity: true, // Enforce the same-origin policy
      allowRunningInsecureContent: false, // Ensure that insecure content isn't loaded
    },
  });
  
  win.loadFile('index.html');
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
