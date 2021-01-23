const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  target: 'browserslist',
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})