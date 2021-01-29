const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    // publicPath: 'https://www.negro.chn/', // 如果项目中的静态资源上传到 CDN ，可以通过配置 publicPath 添加前缀
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist') // 此处相对于 build-base-conf/webpack.config.js 的文件路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false // 防止 watch 触发增量构建后删除 index.html 文件
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  optimization: {
    splitChunks: {
      // all ：全部 chunk
      // async ：异步 chunk ，只处理异步导入的文件
      // initial ：入口 chunk ，不处理异步导入的文件
      chunks: 'all',
      // 缓存分组
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true, // 如果一个模块已经被打包了，再打包会忽略这个模块
          name: 'vendors'
        }
      }
    }
  },
  performance: false // 忽略性能上的提示
}