const themeStorageKey = 'portfolioTheme';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
}

function getSavedTheme() {
  return localStorage.getItem(themeStorageKey) || 'light';
}

function updateThemeButton(button) {
  const isDark = document.documentElement.dataset.theme === 'dark';
  button.textContent = isDark ? 'Light' : 'Dark';
  button.setAttribute('aria-label', isDark ? 'Light mode' : 'Dark mode');
}

applyTheme(getSavedTheme());

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const themeButton = document.createElement('button');
  themeButton.className = 'theme-toggle';
  themeButton.type = 'button';
  updateThemeButton(themeButton);

  themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    updateThemeButton(themeButton);
  });

  navLinks.appendChild(themeButton);
});
