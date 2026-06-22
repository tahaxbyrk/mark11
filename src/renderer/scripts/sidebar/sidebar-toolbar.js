// This file contains the logic for the sidebar's toolbar components.
const createFileBtn = document.getElementById('create-file-btn');
const openFileBtn = document.getElementById('open-file-btn');

import { addNoteToSidebar, openNote } from "../editor/editor.js";

createFileBtn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.createFile();
    if (!filePath) return;

    await window.electronAPI.addFile(filePath);
    const item = addNoteToSidebar(filePath);
    await openNote(filePath, item);
});

openFileBtn.addEventListener('click', async () => {
    const filePaths = await window.electronAPI.openFile();
    if (!filePaths) return;

    await window.electronAPI.addFile(filePaths);
    const item = addNoteToSidebar(filePaths);
    await openNote(filePaths, item);
});