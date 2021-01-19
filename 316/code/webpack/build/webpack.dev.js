const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 告诉服务器内容的来源
    open: true, // 在服务器启动后打开浏览器
    hot: true, // 开启热模块更新
    hotOnly: true // 即使热模块更新失败，也不让浏览器自动刷新
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    usedExports: true
  },
  target: 'web'
})