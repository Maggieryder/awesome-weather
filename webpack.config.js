var webpack = require('webpack'),
    path = require('path'),
    //CleanPlugin = require('clean-webpack-plugin'),

    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer');

var extractSCSS = new ExtractTextPlugin('css/[name].css'),
    extractCSS = new ExtractTextPlugin('libs/bootstrap.css')

var plugins = [
  new HtmlWebpackPlugin({
    inject:true,
    template:'./src/index.html'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('css/[name].css'),
  //extractSCSS,
  //extractCSS//,
  /*new webpack.optimize.CommonsChunkPlugin({
       name:      'common.js', // Move dependencies to our main file
       children:  true, // Look for common dependencies in all children,
       minChunks: 2, // How many times a dependency must come up before being extracted
   }),*/
];

module.exports = {
  devtool: 'cheap-module-eval-sourec-map',
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors],
    path.resolve(__dirname, 'src', 'jsx', 'index.jsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/dist/'
  },
  resolve:{
    root: __dirname,
    alias:{
      /*Shell:'./jsx/views/shell.jsx',
      Header:'./jsx/views/header.jsx',
      Footer:'./jsx/views/footer.jsx',
      Nav:'./jsx/components/nav.jsx',
      Home:'./jsx/views/home.jsx',
      Users:'./jsx/views/users.jsx',
      User:'./jsx/views/user.jsx',
      NoMatch:'./jsx/views/404.jsx'
      WeatherForm: './jsx/components/form-weather.jsx'*/
    },
    extensions:['','.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'react-hot!babel',
        exclude: /node_modules/,
      },
      {
          test:   /\.scss$/,
          //loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap')
          loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
          //loader: 'style!css!postcss!sass'
      },
      {
          test:   /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css')//,
          //include: path.resolve(__dirname, 'src','vendor')
          //loader: 'style!css'
      },
      {
          test:   /\.(ttf|eot|woff|woff2|png|gif|jpe?g|svg)$/i,
          loader: 'url?limit=8192&context=src&name=[path][name].[ext]!img?minimize'
      }
    ]
  },
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
  },
  plugins:plugins,
  debug:true,
  devServer: {
    contentBase:'./dist',
    hot:true
  }
}
