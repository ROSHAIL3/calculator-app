import React from 'react';

function ThemeToggle({ theme, toggleTheme }) {
  // A button that toggles between light/dark mode
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      aria-label="Toggle light/dark theme"
    >
      {theme === "light" ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
