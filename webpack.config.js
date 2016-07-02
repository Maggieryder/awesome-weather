'use strict'

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const pkg = require('./package.json');


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app_dir: path.join(__dirname, 'src'),
  source: path.join(__dirname, 'src/jsx/index.jsx'), //path.resolve(__dirname, 'src', 'jsx', 'index.jsx')
  output: path.join(__dirname, 'dist'), //path.resolve(__dirname, 'dist')
  tests: path.join(__dirname, 'tests'),
  style: path.join(__dirname, 'src', 'scss', 'main.scss'),
  vendor: path.join(__dirname, 'src', 'vendor'),
  images: path.join(__dirname, 'src', 'images'),
  fonts: path.join(__dirname, 'src', 'fonts')
};

const extractSCSS = new ExtractTextPlugin('css/[name].css');
const extractCSS = new ExtractTextPlugin('css/vendors.css')

const common = {
  context: __dirname,
  entry: {
    vendors: ['react','react-dom','redux','react-redux','redux-promise','react-router','react-bootstrap','react-sparklines','axios'],
    app: [PATHS.source]//Object.keys(pkg.dependencies)
    //style: PATHS.style
  },
  externals: {
    //jquery: 'jQuery'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      PATHS.app_dir + '/jsx',
      PATHS.app_dir + '/jsx/components',
      PATHS.app_dir + '/jsx/views',
      PATHS.app_dir + '/icons'
    ],
    alias: {
      Styles: PATHS.app_dir + '/scss/main.scss'
    },
    extensions: ['', '.js', '.jsx', 'json']
  },
  output: {
    path: PATHS.output,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    noParse: [],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: PATHS.source
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'react-hot!babel?cacheDirectory',
        exclude: /node_modules/
      },
      // Define development specific CSS setup
      {
        test:   /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),//'style!css',
        include: PATHS.vendor
      },
      {
        test:   /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap'),
        //loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
        include: PATHS.style
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      // images & fonts
      {
        test:   /\.(ttf|eot|woff|woff2|png|gif|jpe?g|svg)$/i,
        loader: 'url?limit=8192&context=src&name=[path][name].[ext]!img?minimize'//,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
    //extractSCSS,
    //extractCSS,
    new ExtractTextPlugin('css/[name].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.NoErrorsPlugin()
  ],
  postcss: [autoprefixer({browsers: ['last 5 versions']})],
  imagemin: {
    gifsicle: { interlaced: false },
    jpegtran: {
      progressive: true,
      arithmetic: false
    },
    optipng: { optimizationLevel: 5 },
    pngquant: {
      floyd: 0.5,
      speed: 2
    },
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false }
      ]
    }
  }
};

let config

if(TARGET === 'dev' || !TARGET) {
  config = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    //debug:true,
    devServer: {
      historyApiFallback: true,
      contentBase: './dist',
      hot: true,
      inline: true,
      progress: true,
      // display only errors to reduce the amount of output
      stats: 'errors-only',
      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: 3000
    },
    /*
    entry: {
      app: [
        //'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
        //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors],
        PATHS.source
      //],
      //vendors: ['react','react-dom','redux','react-redux','redux-promise','react-router','react-bootstrap','react-sparklines','axios']//Object.keys(pkg.dependencies)
      //style: PATHS.style
    },
    /*module: {
      loaders: [
        // Define development specific CSS setup
        {
          test:   /\.scss$/,
          loaders: ['style', 'css?sourceMap!postcss!sass?sourceMap'],
          include: PATHS.style
        },
        {
          test:   /\.css$/,
          loader: 'style!css'
          //include: path.resolve(__dirname, 'src','vendor')

        }
      ]
    },*/
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'test') {
  config = merge(common, {
    devtool: 'inline-source-map',
    cache: false,
    externals: {
      //jquery: 'jQuery',
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    },
    plugins: [
      //new webpack.DefinePlugin({
        //'process.env.NODE_ENV': JSON.stringify('test')
      //})
      /*
      new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, function(result) {
        if(/cheerio/.test(result.context)) {
            result.request = './package.json'
        }
      })
      */
    ]
  });
}

if(TARGET === 'build' || TARGET === 'start' || TARGET === 'stats') {
  config = merge(common, {
    devtool: 'source-map',
    //entry: {
      //vendors: ['react','react-dom','redux','react-redux','redux-promise','react-router','react-bootstrap','react-sparklines','axios']
      //vendors: Object.keys(pkg.dependencies)
    //},
    output: {
      path: PATHS.output,
      filename: 'js/[name].js', //.[chunkhash]
      chunkFilename: '[chunkhash].js',
      publicPath: '/'
    },
    /*
    module: {
      loaders: [
        // Extract CSS during build
        {
          test:   /\.css$/,
          loader: extractCSS.extract('style', 'css'),//'style!css',
          include: PATHS.vendor
        },
        {
          test:   /\.scss$/,
          loader: extractSCSS.extract('style', 'css?sourceMap!postcss!sass?sourceMap'),
          //loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
          include: PATHS.style
        },
        // images & fonts
        {
          test:   /\.(ttf|eot|woff|woff2|png|gif|jpe?g|svg)$/i,
          loader: 'url?limit=8192&context=src&name=[path][name][hash].[ext]!img?minimize'//, file?name etc
            //include: PATHS.images
        }
      ]
    },*/
    plugins: [
      new CleanPlugin([PATHS.output]),
      //new webpack.optimize.OccurenceOrderPlugin(),
      // Output extracted CSS to a file
      //extractSCSS,
      //extractCSS,
      //new ExtractTextPlugin('css/[name].[hash].css'),
      /*
      // Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      */
      // Setting DefinePlugin affects React library size!
      new webpack.DefinePlugin({
        //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) //'production'
        'process.env':{'NODE_ENV': JSON.stringify('production')}
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new StatsPlugin()
    ]
  });
}

module.exports = config;
