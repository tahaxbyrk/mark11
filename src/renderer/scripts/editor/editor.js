// This file contains the editor logic.
const editor = document.getElementById("editor");
const noteWrapper = document.getElementById("note-wrapper");

let currentFilePath = null;

export function addNoteToSidebar(filePath) {
    const fileName = filePath.split('\\').pop().split('/').pop();
    const title = fileName.replace('.md', '');

    const item = document.createElement('div');
    item.classList.add('noteItem');
    item.dataset.path = filePath;

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    item.addEventListener('click', () => openNote(filePath, item));

    const closeButton = document.createElement('button');
    closeButton.classList.add('noteItemRemoveBtn');
    closeButton.textContent = '×';
    closeButton.title = 'Remove note';
    closeButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        await window.electronAPI.removeFile(filePath);
        item.remove();
        if (currentFilePath === filePath) {
            currentFilePath = null;
            editor.value = '';
            editor.disabled = true;
        }

        if (preview) {
            preview.innerHTML = '';
        }
    });

    item.appendChild(titleSpan);
    item.appendChild(closeButton);
    noteWrapper.appendChild(item);
    return item;
}

export async function openNote(filePath, item) {
    document.querySelectorAll('.noteItem').forEach(i => i.classList.remove('active'));
    if (item) item.classList.add('active');
    currentFilePath = filePath;
    let content;
    content = await window.electronAPI.readFile(filePath);
    editor.value = content;
    editor.disabled = false;

    if (!preview.classList.contains('hidden')) {
        window.electronAPI.parseMarkdown(content || '').then((html) => {
            preview.innerHTML = html;
        });
    }
}

editor.addEventListener('input', () => {
    if (!currentFilePath) return;
    window.electronAPI.saveFile(currentFilePath, editor.value);
});

(async () => {
    const notes = await window.electronAPI.getFile();
    notes.forEach(filePath => addNoteToSidebar(filePath));
})();