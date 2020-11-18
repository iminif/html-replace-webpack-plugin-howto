var path = require('path')
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
var htmlReplaceConfig = require('./conf/html-replace')

function ReloadPlugin(options) {}
ReloadPlugin.prototype.apply = () => {}

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, 'src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:7].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ReloadPlugin(),
    new HtmlWebpackPlugin({
      title: 'Foo',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: false,
      chunks: 'all',
      chunksSortMode: 'auto'
    }),
    new HtmlReplaceWebpackPlugin(htmlReplaceConfig)
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        options: {}
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  }
}
