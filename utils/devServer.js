const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

module.exports = (app) => {
  webpackConfig.entry.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackConfig.mode = 'development';

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
