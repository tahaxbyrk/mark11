// This file contains the logic for changing the theme of the application, allowing users to switch between light , dark and system modes.
const themeSelector = document.getElementById('theme-select');

themeSelector.addEventListener('change', (e) => {
    window.electronAPI.setTheme(e.target.value);
});

window.electronAPI.getSettings('theme').then((savedTheme) => {
    themeSelector.value = savedTheme || 'system';
});