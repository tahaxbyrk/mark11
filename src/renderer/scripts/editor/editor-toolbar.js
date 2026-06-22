// This file contains the logic for the editor toolbar components.
const editBtn = document.getElementById('edit-btn');
const previewBtn = document.getElementById('preview-btn');

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

editBtn.addEventListener('click', () => {
    editor.classList.remove('hidden');
    preview.classList.add('hidden');
    editBtn.classList.add('active');
    previewBtn.classList.remove('active');
});

previewBtn.addEventListener('click', async () => {
    let html;
    html = await window.electronAPI.parseMarkdown(editor.value || '');
    preview.innerHTML = html;
    editor.classList.add('hidden');
    preview.classList.remove('hidden');
    previewBtn.classList.add('active');
    editBtn.classList.remove('active');
    preview.style.overflowY = 'scroll';
});