/**
 * Created by xuwei on 2017/4/18.
 */
const webpack = require('webpack')
process.env.NODE_ENV='production'
const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
// var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/',
        chunkFilename: 'js/[id].[chunkhash].chunk.js',
        filename: 'js/[name].[chunkhash].min.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
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