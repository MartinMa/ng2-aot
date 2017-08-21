const ngToolsWebpack = require('@ngtools/webpack');
const path = require("path");

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './app/main.jit.ts',
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: './tsconfig.aot.json'
    }),
    new OptimizeJsPlugin({sourceMap: false}),
    new UglifyJsPlugin({
      beautify: false,
      output: {
        comments: false
      },
      mangle: {
        // eslint-disable-next-line camelcase
        screw_ie8: true
      },
      compress: {
        // eslint-disable-next-line camelcase
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        // eslint-disable-next-line camelcase
        dead_code: true,
        evaluate: true,
        // eslint-disable-next-line camelcase
        if_return: true,
        // eslint-disable-next-line camelcase
        join_vars: true,
        // eslint-disable-next-line camelcase
        negate_iife: false // We need this for lazy v8
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: ['@ngtools/webpack'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
