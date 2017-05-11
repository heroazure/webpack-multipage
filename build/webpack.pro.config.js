/**
 * Created by xuwei on 2017/4/18.
 */
var webpack = require('webpack')
var webpackBaseConfig = require('./webpack.base.config')
var merge = require('webpack-merge')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = merge(webpackBaseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        /*new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
                discardComments: {removeAll: true }
            }
        })*/
    ]
})