/**
 * Created by xuwei on 2017/4/18.
 */
var webpack = require('webpack')
var path=require('path')
var util=require('./util')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
// var ImageminPlugin = require('imagemin-webpack-plugin').default
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
        publicPath: '/dist/',
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
                        loader: 'file-loader',
                        query: {
                            limit: 10000,
                            name: 'img/[name].[hash:7].[ext]'
                        }
                    },
                    {
                        //https://github.com/tcoopman/image-webpack-loader
                        loader: 'image-webpack-loader',
                        query: {
                            guetzli: {
                                quality: 95,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
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
        extensions: ['.js', '.less', '.css','.ejs'],
        alias: {}
    },
    plugins: plugins,
}