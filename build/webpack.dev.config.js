/**
 * Created by xuwei on 2017/4/18.
 */
var webpack = require('webpack')
var path=require('path')
var webpackBaseConfig = require('./webpack.base.config')
var merge = require('webpack-merge')
function resolve(dir) {
    return path.resolve(__dirname,'..',dir)
}
module.exports = merge(webpackBaseConfig, {
    //watch:true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 9900,
        open:true,
        contentBase: [resolve('dist')],
        historyApiFallback:{
            rewrites: [
                { from: /^\/$/, to: '/views/home/index/index.html' },
                { from: /^\/about$/, to: '/views/home/about/index.html' },
                //{ from: /./, to: '/views/404.html' }
            ]
        },
        inline: true,
        hot:true
    }
})