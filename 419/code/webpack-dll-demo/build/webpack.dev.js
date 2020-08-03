const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpackCommonConf = require('./webpack.common.js')
const { srcPath, distPath } = require('./paths')
const { DllReferencePlugin } = require('webpack')

module.exports = merge(webpackCommonConf, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: ['vue-loader'],
        include: srcPath,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')
    }),
    new VueLoaderPlugin(),
    // 告诉 webpack 使用了哪些动态链接库
    new DllReferencePlugin({
      manifest: require(path.join(distPath, 'vue.manifest.json'))
    })
  ],
  devServer: {
    port: 8080,
    progress: true,
    contentBase: distPath,
    open: true,
    compress: true,
    proxy: {
      '/api': 'http://localhost:3000',
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api2': ''
        }
      }
    }
  }
})
