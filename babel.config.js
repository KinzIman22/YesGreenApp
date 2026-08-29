module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    'module:@babel/plugin-transform-class-properties',
    'module:@babel/plugin-transform-private-methods',
    'module:@babel/plugin-transform-private-property-in-object',
    'react-native-reanimated/plugin', // Yeh HAMESHA sabse aakhir mein honi chahiye
  ],
};