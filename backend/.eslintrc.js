module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': ['error', {
      allow: ['_id'],
    }],
    'no-console': 'off',
    'linebreak-style': 0,
  },
};
