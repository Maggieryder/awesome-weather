const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      //'node_modules/foundation-sites/dist/foundation.min.js',
      'src/tests/**/*.test.jsx'
    ],
    preprocessors: {
      'src/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['progress'],
    client: {
      // log console output in our test console
      //captureConsole: true
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter')
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    //browserNoActivityTimeout: 60000, // 60 seconds
    captureTimeout: 60000
  });
};
