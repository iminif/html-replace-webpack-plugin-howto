var express = require('express')
var webpack = require('webpack')
var webpackDevMiddle = require('webpack-dev-middleware')
var webpackConfig = require('../webpack.config')

var port = 7799
var url = 'http://localhost:' + port

Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['./dev/client'].concat(webpackConfig.entry[name])
  webpackConfig.entry[name] = ['./conf/html-replace'].concat(webpackConfig.entry[name])
})

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = webpackDevMiddle(compiler, {
  publicPath: '/'
})

devMiddleware.waitUntilValid(function () {
  var chalk = require('chalk')
  console.log(chalk.green('We are going to start the browser...'))
  setTimeout(function () {
    require('shelljs/global')
    exec('start "" ' + url)
  }, 3000)
})

// serve webpack bundle output
app.use(devMiddleware)

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
compiler.hooks.afterEmit.tapAsync('ReloadPlugin', (params, callback) => {
  hotMiddleware.publish({
    action: 'reload'
  })
  callback()
})

app.use(hotMiddleware)

module.exports = app.listen(port, function (err) {
  if (err) {
    console.error(err)
    return
  }
  console.log('Listening at', url)
})
