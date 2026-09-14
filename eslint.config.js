import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintReact from '@eslint-react/eslint-plugin';

export default defineConfig([
  {
    ignores: [
      'dist/**',
      'build/**',
      'www/**',
      '.ionicons/**',
      'capacitor.config.ts',
      'android/**',
      'ios/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      eslintReact.configs['recommended-typescript'],
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@eslint-react/no-array-index-key': 'warn',
      '@eslint-react/dom-no-dangerously-set-innerhtml': 'error',
      'no-undef': 'off',
    },
  },
]);