'use client';

import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 border rounded">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
