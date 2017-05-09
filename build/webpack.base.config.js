/**
 * Created by xuwei on 2017/4/18.
 */
var webpack = require('webpack')
var path=require('path')
var util=require('./util')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
//var HtmlWebpackEvent = require("./html-webpack-event")
function resolve(dir) {
    return path.resolve(__dirname,'..',dir)
}
const extractTextViews = new ExtractTextPlugin({
    filename:"css/[name].[hash].css",
    allChunks: true
})
const extractTextCommon = new ExtractTextPlugin('css/common.[hash].css')

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
    }),
    extractTextCommon,
    extractTextViews,
    //new HtmlWebpackEvent()
]
plugins=plugins.concat(util.HtmlWebpackPlugins)
module.exports={
    entry:util.entry,
    output: {
        path: resolve('dist/'),
        publicPath: '/',
        chunkFilename: 'js/[id].[hash].chunk.js',
        filename: 'js/[name].[hash].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.ejs$/,
                exclude: /node_modules/,
                loader: 'ejs-loader'
            },
            {
                test: /\.less$/,
                include: [resolve('src/views')],
                exclude: /node_modules/,
                use: extractTextViews.extract({
                    use: ['css-loader','postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                include: [resolve('src/assets/css')],
                exclude: /node_modules/,
                use: extractTextCommon.extract({
                    use: ['css-loader','postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loaders:[
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 10000,
                            name: 'img/[name].[hash:7].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            gifsicle:{
                                interlaced: false
                            },
                            mozjpeg: {
                                quality: 65,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                    {
                                        removeEmptyAttrs: false,
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.less', '.css','.ejs','.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'layout':resolve('src/layout'),
            'assets':resolve('src/assets'),
        }
    },
    plugins: plugins,
}