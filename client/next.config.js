module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};


const withCSS = require('@zeit/next-css');
module.exports = withCSS();

// const withImages = require('next-images');
// module.exports = withImages();
