const { getDefaultConfig } = require('expo/metro-config')
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config')

const config = getDefaultConfig(__dirname)

// Wrap with Reanimated config
module.exports = wrapWithReanimatedMetroConfig(config)
