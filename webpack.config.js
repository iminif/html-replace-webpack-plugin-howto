var path = require('path')
var webpack = require('webpack')

var HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
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
    filename: '[name].[hash:7].js'
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
    new HtmlReplaceWebpackPlugin(htmlReplaceConfig),
    new(webpack.optimize.OccurenceOrderPlugin ||
      webpack.optimize.OccurrenceOrderPlugin)(),
    new webpack.NoErrorsPlugin()
  ],
  module:
  {
    loaders: [
    {
      test: /\.js$/,
      loader: 'babel',
      indclude: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'test')
      ],
      exclude: /node_modules/
    }]
  },
  resolve:
  {
    extensions: ['', '.js']
  }
}
