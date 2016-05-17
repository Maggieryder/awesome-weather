var express = require('express'),
    path = require('path'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({
  //changeOrigin: true
});
var app = express();

var isProduction = process.env.NODE_ENV === 'production',
    port = isProduction ? process.env.PORT : 3000,
    publicPath = path.resolve(__dirname, 'dist');

app.use(express.static(publicPath));

// If you only want this for development, you would of course
// put it in the "if" block below
/*
app.all('/api/*', function (req, res) {
  proxy.web(req, res, {
    target: 'https://glowing-carpet-4534.firebaseio.com'
  });
});
*/

if (!isProduction) {
  var bundle = require('./server/bundle.js');
  bundle();
  app.all('/dist/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function(){
  console.log('Server running on port', port);
});
