const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadFile('index.html');
    autoUpdater.checkForUpdatesAndNotify(); // Enable updates
}

app.whenReady().then(createWindow);