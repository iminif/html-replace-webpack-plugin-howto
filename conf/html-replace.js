// resources (may be retrieved from somewhere)
const res = {
  js: {
    jquery: 'http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js',
    tether: 'http://cdn.bootcss.com/tether/1.3.7/js/tether.min.js',
    bootstrap: 'http://cdn.bootcss.com/bootstrap/4.0.0-alpha.3/js/bootstrap.min.js'
    // ...
  },
  css: {
    tether: 'http://cdn.bootcss.com/tether/1.3.7/css/tether.min.css',
    bootstrap: 'http://cdn.bootcss.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css'
    // ...
  },
  img: {
    nicePicture: 'https://foo/bar.jpg'
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
    pattern: 'foo',
    replacement: '`foo` has been replaced with `bar`'
  },
  {
    pattern: '@@title',
    replacement: 'html-replace-webpack-plugin'
  },
  {
    pattern: '@@plaintext=whatis',
    replacement: 'Using html-replace-webpack-plugin'
  },
  {
    pattern: /1234/g,
    replacement: 'ab'
  },
  {
    pattern: /(<!--\s*|@@)(css|js|img):([\w-\/]+)(\s*-->)?/g,
    replacement: function (match, $1, type, file, $4, index, input) {
      var url = res[type][file]

      // $1==='@@' <--EQ--> $4===undefined
      return $4 == undefined ? url : tpl[type].replace('%s', url)
    }
  }
]
