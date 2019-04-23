/**
 * Created by joylee on 2019/4/15.
 */
var glob = require('glob')
var path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

var files = glob.sync(resolve('src/pages/**/index.js'))
var pages = {}
files.forEach(function (f) {
  var name = /.*\/pages\/(.*)\/index\.js/.exec(f)[1]
  pages[name] = {
    // page 的入口
    entry: 'src/pages/' + name,
    // 模板来源
    template: 'src/pages/' + name + '/index.html',
    // 在 dist/index.html 的输出
    filename: name + '.html',
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    // title: 'Home Page',
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', name]
  }
})
module.exports = {
  pages: pages,
  pluginOptions: {
    'style-resources-loader': {
      patterns: [
        resolve('src/assets/styles/vars.less'),
        resolve('src/assets/styles/mixins.less')
      ],
      preProcessor: 'less'
    }
  },
  devServer: {
    index: '/home.html'
  }
}
