const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: {
    home: './src/components/page/home.page.js',
    signin: './src/components/page/sign-in.page.js',
  },
  output: {
    filename: './scripts/[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env', {targets: {browsers: ['last 7 versions']}}],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {removeAll: true},
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new CompressionPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './styles/[name].[chunkhash].styles.css',
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
});
