const layout = require('./html.ejs'); // 整个页面布局的模板文件，主要是用来统筹各个公共组件的结构
const header = require('../modules/header/index.ejs'); // 页头的模板
const footer = require('../modules/footer/index.ejs'); // 页脚的模板

/* 整理渲染公共部分所用到的模板变量 */
const config = {
    pageTitle: '',
};

const moduleExports = {
    /* 处理各个页面传入而又需要在公共区域用到的参数 */
    init({pageTitle}) {
        config.pageTitle = pageTitle; // 比如说页面名称，会在<title>或面包屑里用到
        return this;
    },

    /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
    run(content) {
        const renderData = {
            header: header(config),
            footer: footer(config),
            content,
        };
        return layout(renderData);
    },
};

module.exports = moduleExports;
