module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _constants: './src/constants',
          _containers: './src/containers',
          _navigators: './src/navigators',
          _network: './src/network',
          _redux: './src/redux',
          _styles: './src/styles',
          _utils: './src/utils',
          _helpers: './src/helpers',
        },
      },
    },
  },
};
