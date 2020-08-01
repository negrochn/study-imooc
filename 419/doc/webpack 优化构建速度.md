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

