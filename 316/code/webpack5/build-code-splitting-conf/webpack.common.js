const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
    })
  ],
  optimization: {
    splitChunks: {
      // all ：全部 chunk
      // async ：异步 chunk ，只处理异步导入的文件
      // initial ：入口 chunk ，不处理异步导入的文件
      chunks: 'all',
      minSize: 0,
      minRemainingSize: 0,
      minChunks: 1, // 当一个模块被引用至少一次才进行代码分割
      maxAsyncRequests: 30, // 同时加载的模块数最多是 30
      maxInitialRequests: 30, // 入口文件引入的库最多分割出 30 个
      enforceSizeThreshold: 50000,
      // 缓存分组
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true, // 如果一个模块已经被打包了，再打包会忽略这个模块
          chunks: 'async',
          filename: 'vendors.js'
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          chunks: 'initial',
          filename: 'common.js'
        }
      }
    }
  }
}