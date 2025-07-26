'use client';

import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={isDark ? 'dark' : ''}>
      {children}
    </div>
  );
}
