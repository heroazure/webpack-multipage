const express = require('express')
const webpack = require('webpack')
const fs = require('fs-extra')
const {join} = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxy = require('http-proxy-middleware')
const webpackConfig = require('./webpack/webpack.config.dev')
const compiler = webpack(webpackConfig)
let {port, proxyTable = {}, name} = require('./webpack/util').getConfig()
const app = require('express')()
fs.exists(join(__dirname, `src/views/${name}/index.js`), exists => {
  if (!exists) {
    return console.log(`请确保模块 ${name} 存在`)
  }
  Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context]
    if (typeof options === 'string') {
      app.use(proxy(context, {
        target: options,
        changeOrigin: true,
      }))
    } else if (typeof options === 'function') {
      app.use(proxy(options, {
        target: context,
        changeOrigin: true,
      }))
    }
  })
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
  }))
  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(join(__dirname, `./src`)))
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, `./src/views/${name}/index.html`))
  })

  app.listen(port, (error) =>
    error ? console.log(error) : console.log(`Listening on port:${port}`))
})
