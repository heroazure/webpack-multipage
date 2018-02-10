/**
 * Created by xuwei on 2017/4/18.
 */
const path = require('path')
const webpack = require('webpack')
// process.env.NODE_ENV='production'
const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractTextViews = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
    allChunks: true
})
const extractTextCommon = new ExtractTextPlugin('css/common.[contenthash].css')
function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}
module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/',
        chunkFilename: 'js/[id].[chunkhash].chunk.js',
        filename: 'js/[name].[chunkhash].min.js'
    },
    module:{
        rules:[
            {
                test: /\.less$/,
                include: [resolve('src/views')],
                exclude: /node_modules/,
                use: extractTextViews.extract({
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                include: [resolve('src/assets/css')],
                exclude: /node_modules/,
                use: extractTextCommon.extract({
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            }
        ]
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
        // new OptimizeCSSPlugin({
        //     cssProcessorOptions: {
        //         safe: true,
        //         discardComments: {removeAll: true }
        //     }
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        extractTextCommon,
        extractTextViews
    ]
})