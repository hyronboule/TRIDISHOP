module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true, },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',// Ignore missing React imports
    'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }], // Ignore missing React imports
    'react/prop-types': 'off', // Disable prop-types validation
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-unknown-property': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-undef': 'error', // Bloque les variables non définies
    'no-unreachable': 'error', // Bloque les blocs de code inatteignables
  },
}
