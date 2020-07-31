# webpack 高级配置

**webpack 高级配置**

- 基本配置只能做 demo ，不能做线上项目
- 面试考察基本配置，只是为了快速判断你是否用过 webpack
- 以下高级配置，也是通过面试的必要条件
- 多入口



**多入口**

- entry

  ```js
  module.exports = {
    entry: {
      index: path.join(srcPath, 'index.js'),
      other: path.join(srcPath, 'other.js')
    },
  }
  ```

- output （ production 模式）

  ```js
  module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
      filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
      path: distPath
    },
  }
  ```

- plugins

  ```js
  module.exports = {
    plugins: [
      // 多入口 - 生成 index.html
      new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: 'index.html',
        // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
        chunks: ['index'] // 只引用 index.js
      }),
      // 多入口 - 生成 other.html
      new HtmlWebpackPlugin({
        template: path.join(srcPath, 'other.html'),
        filename: 'other.html',
        chunks: ['other'] // 只引用 other.js
      })
    ]
  }
  ```