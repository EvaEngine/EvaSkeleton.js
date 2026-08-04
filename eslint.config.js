import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['build/', 'coverage/', 'node_modules/', 'public/', 'tmp/']
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    rules: {
      // Allow common patterns
      'class-methods-use-this': 'off',
      'no-continue': 'off',
      'no-await-in-loop': 'off',
      'no-console': 'warn',

      // Modern JS best practices
      'no-var': 'error',
      'prefer-const': 'warn',
      'eqeqeq': ['error', 'always'],
      'prefer-template': 'warn',

      // Stylistic
      'comma-dangle': ['warn', 'never'],
      'spaced-comment': ['warn', 'always'],
      'no-trailing-spaces': 'warn',
      'eol-last': ['warn', 'always'],

      // Naming
      'no-underscore-dangle': ['error', {
        allow: ['__dirname'],
        allowAfterThis: true,
        allowAfterSuper: true
      }],

      // Unused variables (allow underscore-prefixed)
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],

      // Restrict problematic syntax
      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement'
      ]
    }
  }
];