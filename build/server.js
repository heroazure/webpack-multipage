/**
 * Created by xuwei on 2017/5/8.
 */
var config = require("./webpack.dev.config.js")
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

config.entry.app.unshift("webpack-dev-server/client?http://localhost:9090/")

var compiler = webpack(config)
var server = new WebpackDevServer(compiler, {
    contentBase:'dist/',
    publicPath: "/assets/"
})
server.listen(9090)