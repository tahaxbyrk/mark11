/*This module is dedicated to centralizing all backend operations that
require operating system permissions for the application.
It is triggered as 'registerIpcHandlers()' in main.js.*/
const { ipcMain, nativeTheme, dialog, app } = require('electron');
const fs = require('fs');
const Store = require('electron-store');
const store = new Store( { name: 'settings' } );
const { marked } = require('marked');

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

    ipcMain.handle('setSettings', (event, key, value) => {
        store.set(key, value);
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

    // Save file function
    ipcMain.handle('saveFile', (event, filePath, content) => {
        fs.writeFileSync(filePath, content, 'utf-8');
    });

    // Read file function
    ipcMain.handle('readFile', (event, filePath) => {
        return fs.readFileSync(filePath, 'utf-8');
    });

    // Remove file function
    ipcMain.handle('removeFile', (event, filePath) => {
        const notes = store.get('notes', []);
        store.set('notes', notes.filter(p => p !== filePath));
    });

    // Save file function (store)
    ipcMain.handle('getFile', () => {
        return store.get('notes', []);
    });

    ipcMain.handle('addFile', (event, filePath) => {
        const notes = store.get('notes', []);

        if (!notes.includes(filePath)) {
            notes.push(filePath);
            store.set('notes', notes);
        }
    });

    ipcMain.handle('parseMarkdown', (event, content) => {
        return marked(content);
    });

    ipcMain.handle('getVersion', () => {
        return app.getVersion();
    });
}

module.exports = { registerIpcHandlers };