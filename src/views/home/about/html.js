/**
 * Created by xuwei on 2017/4/20.
 */
// 调取存放本页面实际内容的模板文件
const content = require('./content.ejs')
// 调用布局方案，在webpack配置里定义其别名为'layout'
const layout = require('layout/layout1/html.js')
// 页面名称
const pageTitle = '关于'
// 给layout传入“页面title”这一参数（有需要的话也可以传入其它参数），同时也传入页面实际内容的HTML字符串。
// content({ pageTitle })的意思就是把pageTitle作为模板变量传给ejs模板引擎并返回最终生成的HTML字符串。
export default layout.init({ pageTitle }).run(content({ params:'' }))