const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  entry: './src/scripts/index.js',
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
          'eslint-loader',
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
  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [ autoprefixer ]
      }
    })
  ]
};
