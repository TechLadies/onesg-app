module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-dynamic-require': 'off',
    strict: 'off',
    semi: ['error', 'always'],
  },
  plugins: ['prettier'],
};
