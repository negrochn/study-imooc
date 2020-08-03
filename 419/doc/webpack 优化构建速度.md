# webpack 优化构建速度

**webpack 性能优化**

- 大厂必考 & 社区热议话题
- 优化打包构建速度 - 开发体验和效率
- 优化产出代码 - 产品性能



**webpack 性能优化 - 构建速度**

- 优化 babel-loader
- IgnorePlugin
- noParsse
- happyPack
- ParallelUglifyPlugin
- 自动刷新
- 热更新
- DllPlugin



**优化 babel-loader**

- 开启缓存，`loader: ['babel-loader?cacheDirectory']`
- 排除范围，include 和 exclude 两者选一个即可

```js
module.exports = {
  entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader?cacheDirectory'], // 开启缓存
        // 排除范围，include 和 exclude 两者选一个即可
        include: srcPath,
        exclude: /node_modules/
      },
    ]
  }
}
```



**IgnorePlugin 避免引入无用模块**

- `import moment from 'moment'`
- 默认会引入所有语言的 JS 代码，代码过大
- 如何只引入中文？

不使用 IgnorePlugin

```shell
            Asset        Size  Chunks                                Chunk Names
index.34a90fb9.js     282 KiB       0  [emitted] [immutable]  [big]  index
```

使用 IgnorePlugin （production 模式）

1. plugins 增加 `new webpack.IgnorePlugin(/\.\/locale/, /moment/)` 忽略 moment 下的 /locale 目录
2. 手动引入中文语言包，`import 'moment/locale/zh-cn'`

```shell
            Asset        Size  Chunks                         Chunk Names
index.a56473d7.js    60.7 KiB       0  [emitted] [immutable]  index
```



**noParse 避免重复打包**

```js
module.exports = {
	module: {
    // 忽略对 react.min.js 文件的递归解析处理
    noParse: [/react\.min\.js$/]
  }
}
```



**IgnorePlugin vs noParse**

- IgnorePlugin 直接不引入，代码中没有
- noParse 引入，但不打包



**happyPack 多进程打包**

- JS 单线程，开启多进程打包
- 提高构建速度（特别是多核 CPU ）

```js
const HappyPack = require('happypack')

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  module: {
    rules: [
      // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPck 实例
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        include: srcPath
      }
    ]
  },
  plugins: [
    // HappyPack 开启多进程打包
    new HappyPack({
      // 使用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 loader 配置一样
      loaders: ['babel-loader?cacheDirectory']
    })
  ]
})
```



**ParallelUglifyPlugin 多进程压缩 JS**

- webpack 内置 Uglify 工具压缩 JS
- JS 单线程，开启多进程压缩更快
- 和 HappyPack 同理

```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  plugins: [
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      // 还是使用 UglifyJS 压缩，只不过帮助开启了多进程
      uglifyJS: {
        output: {
          beautify: false, // 最紧凑的输出
          comments: false // 删除所有的注释
        },
        compress: {
          // 删除所有的 console 语句，可以兼容 ie
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      }
    })
  ]
})
```



**关于开启多进程**

- 项目较大，打包较慢，开启多进程能提高速度
- 项目较小，打包很快，开启多进程会降低速度（进程开销）
- 按需使用



**自动刷新**

```js
// 一般用不到
module.exports = {
  // 注意，开启监听之后，webpack-dev-server 会自动开启刷新浏览器
	watch: true, // 开启监听，默认为 false
  // 监听配置
  watchOptions: {
    ignored: /node_modules/, // 忽略哪些
    // 监听到变化发生后会等 300ms 再去执行动作，防止文件更新太快导致重新编译频率太高
    aggregateTimeout: 300, // 默认为 300ms
    // 判断文件是否发生变化时通过不停的去询问系统指定文件有没有变化实现的
    poll: 1000 // 默认每隔 1000ms 询问一次
  }
}
```



**热更新**

- 自动刷新，整个页面全部刷新，速度较慢，状态会丢失
- 热更新，新代码生效，网页不刷新，状态不丢失

```js
module.exports = merge(webpackCommonConf, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
  }
})
```

```js
if (module.hot) {
  module.hot.accept(['./math'], () => {
    const sumRes = sum(10, 40)
    console.log('sumRes in hot', sumRes)
  })
}
```

