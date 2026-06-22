// Electron preload script.
// This file is loaded before the renderer process is loaded, and has access to both Node.js and browser APIs.
// It can be used to expose a safe API to the renderer process.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setTheme: (theme) => ipcRenderer.invoke('setTheme', theme),
    getSettings: (key) => ipcRenderer.invoke('getSettings', key),
    createFile: () => ipcRenderer.invoke('createFile'),
    openFile: (filePaths) => ipcRenderer.invoke('openFile', filePaths),
    saveFile: (filePath, content) => ipcRenderer.invoke('saveFile', filePath, content),
    readFile: (filePath) => ipcRenderer.invoke('readFile', filePath),
    removeFile: (filePath) => ipcRenderer.invoke('removeFile', filePath),
    getFile: () => ipcRenderer.invoke('getFile'),
    addFile: (filePath) => ipcRenderer.invoke('addFile', filePath),
});