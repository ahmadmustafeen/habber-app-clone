module.exports = {
  root: true,
  extends: ['prettier', 'prettier/react', '@react-native-community'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    node: true,
  },
  globals: {
    fetch: false,
  },
  plugins: ['prettier'],
};
