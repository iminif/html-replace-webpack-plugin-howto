var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

const port = 7799

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

// serve webpack bundle output
app.use(devMiddleware)

module.exports = app.listen(port, function(err)
{
  if(err)
  {
    console.error(err)
    return
  }
  console.log('Start to run a test...')
  console.log('Listening at http://localhost:' + port + '\n')
  console.log('Open the above url to see the result.')
})
