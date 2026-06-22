// This file contains the basic logic of the settings dialog.
const dialog = document.getElementById('settings-dialog');
const settingsBtn = document.getElementById('settings-btn');
const closeBtn = document.getElementById('dialog-close-btn');

const navItems = document.querySelectorAll('.settingsNavItem');

settingsBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.settingsPage').forEach(p => p.classList.remove('active'));
        document.getElementById('page-' + item.dataset.page).classList.add('active');
    });
});