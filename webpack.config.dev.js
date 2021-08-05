const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: {
    home: './src/components/page/home.page.js',
    signin: './src/components/page/sign-in.page.js',
  },
  output: {
    filename: './scripts/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles/[name].styles.css',
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      chunks: ['home'],
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './sign-in/index.html',
      chunks: ['signin'],
    }),
  ],
  devServer: {
    contentBase: './public',
    port: 3000,
    open: false,
    historyApiFallback: true,
    http2: true,
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
  },
});
