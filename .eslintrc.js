module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    impliedStrict: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/no-dynamic-require': 'off',
    'global-require': 0,
    semi: [2, 'always'],
  },
  plugins: ['prettier'],
};
