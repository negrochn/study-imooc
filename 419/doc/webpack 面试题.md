# webpack 面试题

**前端为何要进行打包和构建？**

- 体积更小（ Tree-Shaking 、压缩、合并），加载更快
- 编译高级语言或语法（ TS 、ES6+ 、模块化、SCSS）
- 兼容性和错误提示（ Polyfill 、PostCSS 、ESLint）
- 统一、高效的开发环境
- 统一的构建流程和产出标准
- 集成公司构建规范（提测、上线等）



**module 、chunk 和 bundle 的区别**

- module ，各个源码文件，webpack 中一切皆模块
- chunk ，多模块合并成的（内存中未产出的代码块），如 entry 、import() 、splitChunks
- bundle ，最终的输出文件



**loader 和 plugin 的区别**

- loader ，模块转换器，如 less → css
- plugin ，扩展插件，如 HtmlWebpackPlugin



**常见 loader 和 plugin 有哪些**

- https://www.webpackjs.com/loaders/
- https://www.webpackjs.com/plugins/
- 把此前示例中的 loader 和 plugin 答出来即可
  - loader ：style-loader 、css-loader 、postcss-loader 、less-loader 、vue-loader 、file-loader 、url-loader 、babel-loader
  - plugin ：html-webpack-plugin 、clean-webpack-plugin 、mini-css-extract-plugin 、terser-webpack-plugin 、optimize-css-assets-webpack-plugin 、webpack.HotModuleReplacementPlugin 、webpack.IgnorePlugin 、happypack 、webpack-parallel-uglify-plugin 、webpack.DllPlugin 、webpack.DllReferencePlugin



**Babel 和 webpack 的区别**

- Babel ，JS 新语法编译工具，不关心模块化
- webpack ，打包构建工具，是多个 loader 和 plugin 的集合



**如何产出一个 lib**

- 参考 webpack.dll.js
- output.library

```js
module.exports = {
  mode: 'development',
  entry: {
    // 把 Vue 相关模块的放到一个单独的动态链接库
    vue: ['vue']
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 文件夹下
    path: distPath,
    // 存放动态链接库的全局变量名称，例如对应 vue 来说就是 _dll_vue
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]'
  },
}
```



**babel-polyfill 和 babel-runtime 的区别**

- babel-polyfill 会污染全局
- babel-runtime 不会污染全局
- 产出第三方 lib 要用 babel-runtime



**webpack 如何实现懒加载**

- import()
- 结合 Vue 、React 异步组件
- 结合 vue-router 、react-router 异步加载路由



**为何 Proxy 不能被 Polyfill ？**

- 如 class 可以用 function 模拟
- 如 Promise 可以用 callback 来模拟
- 但 Proxy 的功能用 Object.defineProperty 无法模拟



**webpack 优化构建速度（可用于生产环境）**

- 优化 babel-loader
- IgnorePlugin
- noParse
- HappyPack
- ParallelUglifyPlugin



**webpack 优化构建速度（不用于生产环境！）**

- 自动刷新
- 热更新
- DllPlugin



**webpack 优化产出代码**

- 小图片 base64 编码
- bundle 加 hash
- 懒加载
- 提取公共代码
- 使用 CDN 加速
- 使用 production
- Scope Hosting