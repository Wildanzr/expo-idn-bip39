const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

 
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: './global.css',
  inlineRem: 16,
  resolver: {
   extraNodeModules: {
      crypto: path.resolve(__dirname, './node_modules/react-native-quick-crypto'),
    },
  },
});