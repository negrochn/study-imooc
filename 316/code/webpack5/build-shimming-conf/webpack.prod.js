const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[contenthash].js', // contenthash 根据打包的内容改变值，如果两次打包的内容没有改变，则 contenthash 的值是一样的
    chunkFilename: '[name].[contenthash].js'
  },
  target: 'browserslist',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 20480 // 小于 20kb 以 base64 形式打包到 JS 文件中，否则打包到 images 文件夹下
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // 逆序执行
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 经过测试，importLoaders 没有效果
              // 0 => no loaders (default)
              // 1 => postcss-loader
              // 2 => postcss-loader, sass-loader
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin()
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ],
  optimization: {
    minimizer: [new OptimizationCssAssetsPlugin()]
  }
})