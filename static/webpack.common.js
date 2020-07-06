const { CleanWebpackPlugin } = require('clean-webpack-plugin/dist/clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: { main: './static/src/index.tsx' },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${__dirname}/postcss.config.js`,
              },
            },
          },
        ],
      },
      {
        test: /(svg|png|jpg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          context: path.resolve(__dirname, 'src'),
          publicPath: '/static',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ NODE_ENV: process.env.NODE_ENV }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html') }),
    new CopyWebpackPlugin([
      { from: './static/assets/images/favicon.ico', to: './favicon.ico' },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css',
    }),
  ],
};
