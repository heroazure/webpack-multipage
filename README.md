# webpack-multipage

#### webpack多页面项目配置

- 约定页面都放在views文件夹下，可以多级子目录
- 约定公共样式放置在src/assets下
- 每个页面独有样式、图片等资源放置在对应页面文件夹下
- 工具配置中将逐级寻找index.js文件及html(后缀名不做限制)名称的文件作为网页模板
- 具体关键配置查看build/util.js

#### 一般适用项目场景

- 移动端活动页面,反正就是不适合SPA场景的情况

#### webpack做了什么工作

- 多个页面之间公共样式提取
- 不同页面之间的样式、图片等资源单独打包
- 通过.postcssrc.js文件配置样式的预处理，解决所有浏览器的样式兼容问题
- 生产环境样式等资源压缩处理
- 资源文件自动加版本号，解决浏览器缓存问题

### 各个页面的路由配置

- build/webpack.dev2.config.js该文件下rewrites字段配置
- 例如src/views/home/index文件夹对应的html页面的路由为localhost:9900/home/index
- 例如src/views/login文件夹对应的html页面的路由为localhost:9900/login
