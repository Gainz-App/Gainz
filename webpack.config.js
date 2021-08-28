const path = require('path');

// client - everything that webpack bundles up

module.exports = {
  entry: path.resolve('client/index.jsx'),
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/build',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/client'),
    },
  },
};
