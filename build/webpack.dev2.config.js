/**
 * Created by xuwei on 2017/4/18.
 */
const webpack = require('webpack')
const path = require('path')
const glob=require('glob')
// process.env.NODE_ENV='development'
const webpackBaseConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

const files = glob.sync(resolve('src/views/**/index.js'))
let rewrites=files.map(item=>{
    let name=/.*\/views\/(.*)\/index\.js/.exec(item)[1]
    return{
        from:`/${name}`,
        to:`/views/${name}/index.html`
    }
})
// rewrites.push({
//     from:'/',
//     to:'/views/home/index/index.html'
// })

module.exports = merge(webpackBaseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ],
    module:{
        rules:[
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['style-loader','css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        port: 9900,
        open: true,
        compress: true,
        contentBase: [resolve('dist')],
        //localhost:9900对应的页面
        index: '/views/home/index/index.html',
        //open: true时默认打开的路由
        openPage: '',
        historyApiFallback: {
            /*rewrites: [
                {from: /^\/$/, to: '/views/home/index/index.html'},
                {from: /^\/about$/, to: '/views/home/about/index.html'},
                //{ from: /./, to: '/views/404.html' }
            ],*/
            rewrites:rewrites
        },
        inline: true,
        hot: true,
        //progress:true,
        proxy: {
            '/api': {
                target: 'http://erptest/saas/index.php/Api',
                secure: false
            }
        },
        publicPath:'/'
    }
})