const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const pkg = require('./package.json');

const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: `${__dirname}/build`,
    filename: './[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
    alias: {
      Actions: path.resolve(__dirname, 'src/actions'),
      Axios: path.resolve(__dirname, 'src/utils/axios'),
      Utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // react loader 配置了好久
        query: {
          presets: ['react', 'es2015', 'stage-1', 'stage-3'],
          plugins: [
            'transform-decorators-legacy',
            ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'css' }], // 需要配置的地方
          ],
        },
      }, {
        test: /\.less$/,
        loader: extractLESS.extract(['css-loader', 'less-loader']),
      }, {
        test: /\.css$/,
        loader: extractCSS.extract(['css-loader']),
      }, {
        test: /\.(png|gif|jpg|jepg|bmp)$/i,
        loader: 'url-loader?limit=5000', // 限制大小为5kb
      }, {
        test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, // 限制大小小于5k
        loader: 'url-loader?limit=5000',
      },
    ],
  },
  plugins: [
    extractCSS,
    extractLESS,
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin(['./build'], { verbose: false }),
    new webpack.DefinePlugin({
      _DEV_: JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev') || 'false')),
    }),
  ],
};
