const { resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  context: resolve(__dirname, '../src'),
  entry: {
    app: `./index.js`,
    vendor: ['react', 'react-dom', 'react-router']
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:6].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract(['css-loader?modules,localIdentName="[hash:base64:6]",camelCase'])
    }]
  },
  devtool: 'source-map',
  performance: {
    hints: 'error'
  },
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '..')
    }),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, '../src/icons/'),
      to: resolve(__dirname, '../dist/')
    }]),
    new ExtractTextPlugin('styles.[chunkhash:6].css'),
    new StyleExtHtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `./index.html`
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
    }),
    new OfflinePlugin()
  ]
}
