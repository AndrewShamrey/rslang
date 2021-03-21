module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [    
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb/hooks',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'linebreak-style': 0,
    'no-param-reassign': 1,
    'jsx-a11y/no-autofocus': 1,
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/no-static-element-interactions': 1,
    'react/no-array-index-key': 0,
  },
};
