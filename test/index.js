var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('../webpack.config')

var port = 7799
var url = 'http://localhost:' + port

Object.keys(webpackConfig.entry).forEach(function(name)
{
  webpackConfig.entry[name] = ['./test/client']
    .concat(webpackConfig.entry[name])
})

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler,
{
  publicPath: '/',
  stats:
  {
    colors: true,
    chunks: false
  }
})

devMiddleware.waitUntilValid(function()
{
  var chalk = require('chalk')
  console.log(chalk.green('We are going to start the browser...'))
  setTimeout(function()
  {
    require('shelljs/global')
    exec('start "" ' + url)
  }, 3000)
})

// serve webpack bundle output
app.use(devMiddleware)

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation)
{
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb)
  {
    hotMiddleware.publish(
    {
      action: 'reload'
    })
    cb()
  })
})

app.use(hotMiddleware)

module.exports = app.listen(port, function(err)
{
  if(err)
  {
    console.error(err)
    return
  }
  console.log('Listening at', url)
})
