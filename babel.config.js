module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@services': './src/services',
          '@config': './src/config',
          '@types': './src/types',
          '@assets': './assets',
        },
      },
    ],
    // react-native-reanimated/plugin must be listed last
    'react-native-reanimated/plugin',
  ],
};
