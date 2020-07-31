# webpack 高级配置

**webpack 高级配置**

- 基本配置只能做 demo ，不能做线上项目
- 面试考察基本配置，只是为了快速判断你是否用过 webpack
- 以下高级配置，也是通过面试的必要条件
- 多入口
- 抽离 CSS 文件
- 抽离公共代码
- 懒加载
- 处理 JSX
- 处理 Vue



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



**抽离 CSS 文件**

- development 模式

  ```js
  module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          // loader 执行顺序：从后往前
          loader: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.less$/,
          // 增加了 less-loader ，注意顺序
          loader: ['style-loader', 'css-loader', 'less-loader']
        }
      ]
    },
  }
  ```

- production 模式

  - module.rules 使用 MiniCssExtractPlugin.loader 代替 style-loader
  - plugins 使用 new MiniCssExtractPlugin({}) 抽离 CSS 文件
  - optimization.minimizer 使用 new TerserJSPlugin({}) 和 new OptimizeCssAssetsPlugin({}) 压缩 CSS

  ```js
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const TerserJSPlugin = require('terser-webpack-plugin')
  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  
  module.exports = merge(webpackCommonConf, {
    mode: 'production',
    module: {
      rules: [
        // 抽离 css
        {
          test: /\.css$/,
          loader: [
            MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
            'css-loader',
            'postcss-loader'
          ]
        },
        // 抽离 less --> css
        {
          test: /\.less$/,
          loader: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      // 抽离 CSS 文件
      new MiniCssExtractPlugin({
        filename: 'css/main.[contentHash:8].css'
      })
    ],
    optimization: {
      // 压缩 CSS
      minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})]
    }
  })
  ```




**抽离公共代码**

- entry 配置 index 和 other，plugins 配置HtmlWebpackPlugin 的 chunks

  ```js
  module.exports = {
    entry: {
      index: path.join(srcPath, 'index.js'),
      other: path.join(srcPath, 'other.js')
    },
    plugins: [
      // 多入口 - 生成 index.html
      new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: 'index.html',
        // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
        chunks: ['index', 'vendor', 'common'] // 要考虑代码分割
      }),
      // 多入口 - 生成 other.html
      new HtmlWebpackPlugin({
        template: path.join(srcPath, 'other.html'),
        filename: 'other.html',
        chunks: ['other', 'common'] // 考虑代码分割
      })
    ]
  }
  ```

- optimization 配置 splitChunks ，拆分第三方模块和公共模块（ production 模式）

  ```js
  module.exports = merge(webpackCommonConf, {
    mode: 'production',
    optimization: {
      // 分割代码块
      splitChunks: {
        // initial 入口 chunk ，对于一部导入的文件不处理
        // async 异步 chunk ，只对异步导入的文件处理
        // all 全部 chunk
        chunks: 'all',
        // 缓存分组
        cacheGroups: {
          // 第三方模块
          vendor: {
            name: 'vendor', // chunk 名称
            priority: 1, // 权限更高，优先抽离，重要！！！
            test: /node_modules/,
            minSize: 0, // 大小限制
            minChunks: 1 // 最少复用过几次
          },
          // 公共的模块
          common: {
            name: 'common',
            priority: 0,
            minSize: 0,
            minChunks: 2 // 公共模块最少复用几次
          }
        }
      }
    }
  })
  ```



**懒加载**

```js
// 引入动态数据 - 懒加载
setTimeout(() => {
  // 回顾 Vue React 异步组件
  import('./dynamic-data.js').then(res => {
    console.log(res.default.message) // 注意这里的 default
  })
}, 1500)
```



**处理 JSX**

- module.rules 配置 .jsx 文件处理

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: ['babel-loader'],
          include: srcPath,
          exclude: /node_modules/
        }
      ]
    }
  }
  ```

- `npm i @babel/preset-react -D`

- 配置 .babelrc

  ```json
  {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    "plugins": []
  }
  ```



**处理 Vue**

- `npm i vue-loader -D`

- module.rules 配置 .vue 文件处理

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: ['vue-loader'],
          include: srcPath
        }
      ]
    }
  }
  ```