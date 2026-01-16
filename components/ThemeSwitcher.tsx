import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors duration-300"
      aria-label={`Passa a tema ${theme === 'light' ? 'scuro' : 'chiaro'}`}
    >
      {theme === 'light' ? (
        <i className="fas fa-moon fa-lg"></i>
      ) : (
        <i className="fas fa-sun fa-lg"></i>
      )}
    </button>
  );
};

export default ThemeSwitcher;
