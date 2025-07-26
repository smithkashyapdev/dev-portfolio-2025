// eslint.config.js
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Needed to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Convert old-style config to flat config format
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Load legacy Next.js + TypeScript configs
  {
    ignores: ['**/.next/**'],
  },
  ...compat.extends('next', 'next/core-web-vitals', 'next/typescript'),

  // Custom ESLint rules (optional, editable)
  {
    rules: {
      // Allow unused variables starting with underscore
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
