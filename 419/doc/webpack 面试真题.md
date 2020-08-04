# webpack 面试真题

**前端为何要进行打包和构建？**

- 体积更小（ Tree-Shaking 、压缩、合并），加载更快
- 编译高级语言或语法（ TS 、ES6+ 、模块化、SCSS）
- 兼容性和错误提示（ Polyfill 、PostCSS 、ESLint）
- 统一、高效的开发环境
- 统一的构建流程和产出标准
- 集成公司构建规范（提测、上线等）



**module 、chunk 和 bundle 的区别**

- module ，各个源码文件，webpack 中一切皆模块
- chunk ，多模块合并成的（内存中未产出的代码块），如 entry 、import() 、splitChunk
- bundle ，最终的输出文件



**loader 和 plugin 的区别**

- loader ，模块转换器，如 less → css
- plugin ，扩展插件，如 HtmlWebpackPlugin



**常见 loader 和 plugin 有哪些**

- https://www.webpackjs.com/loaders/
- https://www.webpackjs.com/plugins/
- 把此前示例中的 loader 和 plugin 答出来即可