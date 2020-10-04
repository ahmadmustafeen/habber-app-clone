module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
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
        },
      },
    ],
  ],
};
