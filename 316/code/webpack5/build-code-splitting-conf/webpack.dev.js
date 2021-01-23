const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist', // 告诉服务器内容的来源
    open: true, // 在服务器启动后打开浏览器
    hot: true, // 开启热模块更新
    hotOnly: true // 即使热模块更新失败，也不让浏览器自动刷新
  },
  target: 'web', // 浏览器自动刷新需要开启 target: 'web'
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
})