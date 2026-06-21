/*This module is dedicated to centralizing all backend operations that
require operating system permissions for the application.
It is triggered as 'registerIpcHandlers()' in main.js.*/
const { ipcMain, nativeTheme } = require('electron');

function registerIpcHandlers() {

    // Change theme function
    ipcMain.handle('setTheme', (event, theme) => {
        nativeTheme.themeSource = theme;
        return nativeTheme.shouldUseDarkColors;
    });
}

module.exports = { registerIpcHandlers };