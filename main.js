const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const db = require('./auth.js');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('index.html');

    // Auto-updater (works only in production builds)
    autoUpdater.forceDevUpdateConfig = true;
    autoUpdater.checkForUpdatesAndNotify().catch((err) => {
        console.log('Update check failed:', err.message);
    });
}

// Login handler
ipcMain.on('login', (event, { username, password }) => {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (user && require('bcrypt').compareSync(password, user.password)) {
        event.sender.send('login-success', { role: user.role });
    } else {
        event.sender.send('login-failure');
    }
});

app.whenReady().then(createWindow);