const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const config = {
  server: {
    enhanceMiddleware: middleware => {
      return (req, res, next) => {
        if (req.url.startsWith('/debugger-ui')) {
          res.writeHead(404);
          res.end();
          return;
        }
        return middleware(req, res, next);
      };
    },
  },
  resolver: {
    extraNodeModules: {
      react: path.resolve(__dirname, 'node_modules/react'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
