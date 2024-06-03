import { darkModeToggle } from './elements.js';

const deviceInDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

if (deviceInDarkMode.matches) {
    document.body.classList.add('dark-mode');
}

export function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

deviceInDarkMode.addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
darkModeToggle.addEventListener('click', toggleDarkMode);