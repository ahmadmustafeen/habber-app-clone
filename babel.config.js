module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@containers': './src/containers',
          '@navigators': './src/navigators',
          '@network': './src/network',
          '@redux': './src/redux',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@helpers': './src/helpers',
        },
      },
    ],
  ],
};
