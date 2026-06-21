/*This module is dedicated to centralizing all backend operations that
require operating system permissions for the application.
It is triggered as 'registerIpcHandlers()' in main.js.*/
const { ipcMain, nativeTheme } = require('electron');
const Store = require('electron-store');
const store = new Store( { name: 'settings' } );

function registerIpcHandlers() {

    // Change theme function
    ipcMain.handle('setTheme', (event, theme) => {
        nativeTheme.themeSource = theme;
        store.set('theme', theme);
        return nativeTheme.shouldUseDarkColors;
    });

    // Restore settings function
    ipcMain.handle('getSettings', (event, key) => {
        return store.get(key);
    });
}

module.exports = { registerIpcHandlers };