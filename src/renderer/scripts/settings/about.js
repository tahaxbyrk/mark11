// This file contains the logic behind the components in the "About" section of the settings page.
const appVersion = document.getElementById('app-version');
const componentVersions = document.getElementById('component-versions');

window.electronAPI.getVersion().then((version) => {
    appVersion.textContent = `v${version}`;
});

componentVersions.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;