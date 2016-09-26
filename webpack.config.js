var path = require('path')
var webpack = require('webpack')

var HtmlReplaceWebpackPlugin = require('./index')
var htmlReplaceConfig = require('./conf/html-replace')

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:
  {
    app: path.resolve(__dirname, 'src/app.js')
  },
  output:
  {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugin: [
    new HtmlReplaceWebpackPlugin(htmlReplaceConfig),
    new HtmlWebpackPlugin(
    {
      title: 'Foo',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: false,
      chunks: 'all',
      chunksSortMode: 'auto'
    }),
    new(webpack.optimize.OccurenceOrderPlugin ||
      webpack.optimize.OccurrenceOrderPlugin)()
  ],
  module:
  {
    loaders: [
    {
      test: /\.js$/,
      loader: 'babel'
    }]
  },
  resolve:
  {
    extensions: ['', '.js', '.jsx'],
  }
}
