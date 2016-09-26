// resources (may be required from somewhere)
const res = {
  js:
  {
    jquery: '//cdn/jquery/jquery.min.js',
    tether: '//cdn/tether/tether.min.js',
    bootstrap: '//cdn/bootstrap/bootstrap.min.js',
    // ...
  },
  css:
  {
    tether: '//cdn/tether/tether.min.css',
    bootstrap: '//cdn/bootstrap/bootstrap.min.css',
    // ...
  },
  img:
  {
    foo: '//cdn/img/foo.jpg',
    bar: '//cdn/img/bar.jpg',
    // ...
  }
}

const tpl = {
  img: '<img src="%s">',
  css: '<link rel="stylesheet" type="text/css" href="%s">',
  js: '<script type="text/javascript" src="%s"></script>'
}

module.exports = [
{
  regex: 'foo',
  replacement: '`foo` has been replaced with `bar`'
},
{
  regex: '@@title',
  replacement: 'html replace webpack plugin'
},
{
  regex: '@@js~app',
  replacement: './src/app.js'
},
{
  regex: '@@plaintext=whatis',
  replacement: 'This is a test for using the html-replace-webpack-plugin'
},
{
  regex: /(<!--\s*|@@)(css|js|img):([\w-\/]+)(\s*-->)?/g,
  replacement: function(match, $1, type, file, $4, index, input)
  {
    var url = res[type][file]

    // $1==='@@' <--EQ--> $4===undefined
    return $4 == undefined ? url : tpl[type].replace('%s', url)
  }
}]
