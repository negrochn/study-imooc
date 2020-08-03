# webpack 优化产出代码

**webpack 性能优化 - 产出代码**

- 体积更小
- 合理分包，不重复加载
- 速度更快，内存使用更少
- 小图片 base64 编码（对小图片使用 url-loader）
- bundle 加 hash（output.filename: '[name].[contentBase:8].js'）
- 懒加载
- 提取公共代码（ splitChunks 打包第三方代码和公共代码）
- IgnorePlugin（忽略文件不引入）
- 使用 CDN 加速（output 设置 publicPath ，使用 url-loader 时配置 options.publicPath）
- 使用 production
- Scope Hosting



**使用 production**

- 自动开启代码压缩
- Vue 、React 等会自动删掉调试代码（如开发环境的 warning ）
- 启动 Tree-Shaking （去掉无用的代码，必须用 ES6 Module 才生效，commonjs 就不行）



