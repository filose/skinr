const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/scripts/index.js'
  ],
  output: {
    filename: 'js/bundle.min.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [ autoprefixer ]
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
