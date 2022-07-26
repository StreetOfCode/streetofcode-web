module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'vacuumlabs',
    'plugin:@next/next/recommended',
  ],
  env: {
    node: true,
    browser: true,
  },
  globals: {
    JSX: true,
  },
  rules: {
    'indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': [
      'error', {
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-use-before-define': 'off',
    // '@typescript-eslint/no-use-before-define': ['error'], // TODO this throws errors on styled components
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/no-cycle': 'error',
    'import/no-extraneous-dependencies': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'max-len': ['error', { 'code': 120 }],
    "react/display-name": "off",
    "linebreak-style": ["error", "unix"],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['import', 'react-hooks'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['src/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        'prefer-arrow-callback': 'off',
      },
    },
  ],
}
