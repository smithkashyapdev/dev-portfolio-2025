import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: {
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/app/**/*.{js,ts,jsx,tsx}', // for /app router
    ]
  },
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        fadeInUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        slideLeft: 'slideLeft 30s linear infinite',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        text: 'var(--text)',
        primary: 'var(--primary)',
        redtest: '#ff0000', // 👈 Custom color
      },
    },
  },
  plugins: [],
};

export default config;
