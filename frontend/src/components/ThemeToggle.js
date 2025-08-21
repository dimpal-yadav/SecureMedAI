import React from 'react';
import { useTheme } from '../context/ThemeContext';

const icons = {
  light: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#FBBF24"/><g stroke="#FBBF24" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></g></svg>
  ),
  dark: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#1E293B"/></svg>
  ),
  system: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="#38BDF8"/><path d="M8 8h8v8H8z" fill="#fff"/></svg>
  ),
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center">
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden">
        {['system', 'light', 'dark'].map((mode, idx) => (
          <button
            key={mode}
            aria-label={`Switch to ${mode} mode`}
            className={`flex items-center gap-1 px-4 py-2 focus:outline-none transition-colors text-sm font-medium
              ${theme === mode ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700 dark:text-gray-200'}
              ${idx === 0 ? 'rounded-l-full' : ''}
              ${idx === 2 ? 'rounded-r-full' : ''}
            `}
            onClick={() => setTheme(mode)}
          >
            {icons[mode]}
            <span className="hidden md:inline">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
