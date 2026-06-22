// This file contains the logic for the sidebar's toolbar components.
const createFileBtn = document.getElementById('create-file-btn');
const openFileBtn = document.getElementById('open-file-btn');

createFileBtn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.createFile();
    if (!filePath) return;
});

openFileBtn.addEventListener('click', async () => {
    const filePaths = await window.electronAPI.openFile();
    if (!filePaths) return;
})