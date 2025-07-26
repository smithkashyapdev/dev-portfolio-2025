'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
    setTheme('dark');
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <button onClick={toggleTheme} className="p-2 border rounded">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
