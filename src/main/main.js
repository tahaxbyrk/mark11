// Electron main process.
// This file is the entry point of the Electron application.
// It is responsible for creating the application window and managing the application's lifecycle.
const { app, BrowserWindow, nativeTheme } = require('electron/main');
const path = require('node:path');
const {registerIpcHandlers} = require('./ipcHandlers');

const Store = require('electron-store');
const store = new Store( { name: 'settings' } );

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1200,
        height: 900,
        autoHideMenuBar: true,
        backgroundColor: 'rgb(17, 17, 27)',
        icon: path.join(__dirname, '../assets/app-icons/mark11.ico'),
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    window.loadFile(path.join(__dirname, '../renderer/pages/index.html'));
};

app.whenReady().then(() => {
    registerIpcHandlers();
    let savedTheme;
    savedTheme = store.get('theme', 'system');
    nativeTheme.themeSource = savedTheme;
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