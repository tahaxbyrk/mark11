// Electron main process.
// This file is the entry point of the Electron application.
// It is responsible for creating the application window and managing the application's lifecycle.
const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 900,
        height: 700,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    window.loadFile(path.join(__dirname, '../renderer/pages/index.html'));
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});