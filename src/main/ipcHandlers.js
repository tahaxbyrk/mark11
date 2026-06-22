/*This module is dedicated to centralizing all backend operations that
require operating system permissions for the application.
It is triggered as 'registerIpcHandlers()' in main.js.*/
const { ipcMain, nativeTheme, dialog } = require('electron');
const fs = require('fs');
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

    // Create new file function
    ipcMain.handle('createFile', async () => {
        const { filePath, canceled } = await dialog.showSaveDialog({
            title: 'Create new Note',
            buttonLabel: 'Create new Note',
            defaultPath: 'new-note.md',
            filters: [
                { name: 'Markdown', extensions: ['md'] }
            ]
        });

        if (canceled || !filePath) return null;

        fs.writeFileSync(filePath, '');
        return filePath;
    });

    // Open file function
    ipcMain.handle('openFile', async () => {
        const { filePaths, canceled } = await dialog.showOpenDialog({
            title: 'Open Note',
            buttonLabel: 'Open Note',
            defaultPath: 'new-note.md',
            filters: [
                { name: 'Markdown', extensions: ['md'] }
            ]
        });

        if (canceled || !filePaths.length) return null;
        return filePaths[0];
    });
}

module.exports = { registerIpcHandlers };