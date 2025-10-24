//* react-native.config.js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/fonts'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        android: null, // 👈 Tells autolink to ignore it for Android native builds
      },
    },
  },
};
