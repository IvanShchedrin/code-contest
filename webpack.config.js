const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      store: path.resolve(__dirname, 'src/store/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      screens: path.resolve(__dirname, 'src/screens/'),
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: 'index.html'
    }
  },
  optimization: {
    // splitChunks: {chunks: 'all'}
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[folder]_[local]_[hash:base64:3]',
            },
          },
        }, 'sass-loader']
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    //   reportFilename: '../stats.html',
    // }),
  ],
};
