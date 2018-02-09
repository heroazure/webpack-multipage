const express = require('express')
const webpack = require('webpack')
const fs = require('fs-extra')
const {join} = require('path')
const opn = require('opn')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.config')
const compiler = webpack(webpackConfig)
//let {port, proxyTable = {}, name} = require('./webpack/util').getConfig()
let port = 3400
let proxyTable = {
    '/api': 'http://erptest/saas/index.php/Api'
}

const app = express()

const devMiddleware=webpackDevMiddleware(compiler, {
    quiet: true
})
const hotMiddleware=webpackHotMiddleware(compiler,{
    log: false,
    heartbeat: 2000
})
app.use(hotMiddleware)
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})
app.use(express.static(join(__dirname, '../dist')))

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')({
    rewrites: [
        { from: /^\/$/, to: '/views/home/index/index.html' },
        { from: /^\/about$/, to: '/views/home/about/index.html' },
        //{ from: /./, to: '/views/404.html' }
    ]
}))

app.use(devMiddleware)

app.listen(port, (error) =>{
    if(error){
        console.log(error)
    }else {
        console.log(`Listening on port:${port}`)
        opn('http://localhost:' + port)
    }
})

