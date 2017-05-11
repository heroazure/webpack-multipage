/**
 * Created by xuwei on 2017/4/24.
 */
var glob=require('glob')
var path=require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
    return path.resolve(__dirname,'..',dir)
}

var files = glob.sync(resolve('src/views/**/index.js'))
var newEntries = {}
var HtmlWebpackPlugins=[]

files.forEach(function(f){
    var name = /.*\/views\/(.*)\/index\.js/.exec(f)[1]
    newEntries[name] = f
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: resolve('dist/views/'+name+'/index.html'),
        template: resolve('src/views/'+name+'/html'),
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            minifyJS:true
        },
        chunks:['manifest','vendor',name]
    }))
})

module.exports={
    entry:Object.assign({},newEntries,{vendor:['jquery','vue']}),
    HtmlWebpackPlugins:HtmlWebpackPlugins
}