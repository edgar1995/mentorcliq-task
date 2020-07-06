const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    compress: true,
    port: 8000,
    hot: false,
    inline: false,
    proxy: {
      '/static': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/static': '' },
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /^((?!node_modules).)*.css/,
          chunks: 'all',
          enforce: true,
        },
        vendorStyles: {
          name: 'vendor-styles',
          test: /node_modules.*css/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  target: 'web',
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
});
