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
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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
              modules: true // 开启 CSS Modules
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 20480 // 小于 20kb 以 base64 形式打包到 js 文件中，否则打包到 images 文件夹下
          }
        }
      }
    ]
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
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor',
          priority: 1, // 权限更高，有限抽离，重要！！！
          test: /[\\/]node_modules[\\/]/,
          minSize: 0, // 大小限制
          minChunks: 1, // 最少复用几次
          reuseExistingChunk: true // 如果模块被打包过，就使用之前打包过的模块
        },
        // 公共的模块
        common: {
          name: 'common',
          priority: 0,
          minSize: 0,
          minChunks: 1, // 公共模块最少复用几次
          reuseExistingChunk: true
        }
      }
    }
  }
}