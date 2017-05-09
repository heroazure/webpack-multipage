/**
 * Created by xuwei on 2017/4/26.
 * https://www.npmjs.com/package/html-webpack-plugin
 */
function MyPlugin(options) {
    // Configure your plugin with options...
}
MyPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation) {
        console.log('The compiler is starting a new compilation...')

        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            htmlPluginData.html += 'The magic footer'
            callback(null, htmlPluginData)
        })
    })
}

module.exports=MyPlugin