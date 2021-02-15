module.exports = {
    webpackDevMiddleware:config => {
        config.watchOptions.poll = 300;
        return config;
    }
}


const withCSS = require('@zeit/next-css');
module.exports = withCSS();

// const withImages = require('next-images');
// module.exports = withImages();
