const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HappyPack = require('happypack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  output: {
    // filename: 'bundle.[contentHash:8].js', // 打包代码时，加上 hash
    filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
    path: distPath,
    // publicPath: 'http://cdn.abc.com' // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  module: {
    rules: [
      // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPck 实例
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        include: srcPath
      },
      // 图片 - 参考 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然沿用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,
            // 打包到 img 目录下
            outputPath: '/img/',
            // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
            // publicPath: 'http://cdn.abc.com'
          }
        }
      },
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
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production')
    }),
    // 抽离 CSS 文件
    new MiniCssExtractPlugin({
      filename: 'css/main.[contentHash:8].css'
    }),
    // 忽略 moment 下的 /locale 目录
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    // HappyPack 开启多进程打包
    new HappyPack({
      // 使用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 loader 配置一样
      loaders: ['babel-loader?cacheDirectory']
    }),
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
  ],
  optimization: {
    // 压缩 CSS
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
    // 分割代码块
    // splitChunks: {
    //   // initial 入口 chunk ，对于一部导入的文件不处理
    //   // async 异步 chunk ，只对异步导入的文件处理
    //   // all 全部 chunk
    //   chunks: 'all',
    //   // 缓存分组
    //   cacheGroups: {
    //     // 第三方模块
    //     vendor: {
    //       name: 'vendor', // chunk 名称
    //       priority: 1, // 权限更高，优先抽离，重要！！！
    //       test: /node_modules/,
    //       minSize: 0, // 大小限制
    //       minChunks: 1 // 最少复用过几次
    //     },
    //     // 公共的模块
    //     common: {
    //       name: 'common',
    //       priority: 0,
    //       minSize: 0,
    //       minChunks: 2 // 公共模块最少复用几次
    //     }
    //   }
    // }
  }
})