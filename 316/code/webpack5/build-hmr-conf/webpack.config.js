const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    // publicPath: 'https://www.negro.chn/', // 如果项目中的静态资源上传到 CDN ，可以通过配置 publicPath 添加前缀
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist') // 此处相对于 build-base-conf/webpack.config.js 的文件路径
  },
  devServer: {
    contentBase: './dist', // 告诉服务器内容的来源
    open: true, // 在服务器启动后打开浏览器
    hot: true, // 开启热模块更新
    hotOnly: true // 即使热模块更新失败，也不让浏览器自动刷新
  },
  target: 'web', // 浏览器自动刷新需要开启 target: 'web'
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
        use: ['style-loader', 'css-loader', 'postcss-loader'] // 逆序执行
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 经过测试，importLoaders 没有效果
              // 0 => no loaders (default)
              // 1 => postcss-loader
              // 2 => postcss-loader, sass-loader
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false // 防止 watch 触发增量构建后删除 index.html 文件
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}