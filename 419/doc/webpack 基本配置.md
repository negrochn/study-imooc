# webpack 基本配置

**webpack 基本配置**

- vue-cli 、create-react-app
- 常用上述脚手架，而不会自己配置 webpack
- 则面试不会通过
- 拆分配置和 merge
- 启动本地服务
- 处理 ES6
- 处理样式
- 处理图片
- （模块化）



**拆分配置和 merge**

- webpack.common.js 、webpack.dev.js 、webpack.prod.js
- webpack-merge（ merge 函数）



**启动本地服务**

- `"devBuild": "webpack --config build-base-conf/webpack.dev.js",`
- `"dev": "webpack-dev-server --config build-base-conf/webpack.dev.js",`
- `"build": "webpack --config build-base-conf/webpack.prod.js"`



**处理 ES6**

- @babel/core 、@babel/preset-env
- .babelrc

  ```js
  {
    "presets": ["@babel/preset-env"],
    "plugins": []
  }
  ```



**处理样式**

- css

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          // loader 执行顺序：从后往前
          loader: ['style-loader', 'css-loader', 'postcss-loader']
        },
      ]
    }
  }
  ```

  postcss-loader 需要配置 postcss.config.js

  ```js
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
  ```

  还需要在 package.json 中增加 browsersList

  ```json
  {
    "browserslist": [
      "last 1 version",
      "> 1%",
      "IE 10"
    ]
  }
  ```

- less

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.less$/,
          // 增加了 less-loader ，注意顺序
          loader: ['style-loader', 'css-loader', 'less-loader']
        },
      ]
    }
  }
  ```



**处理图片**

- development ，通过 file-loader 直接引入图片 url

  ```js
  module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
      rules: [
        // 直接引入图片 url
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: 'file-loader'
        }
      ]
    },
  }
  ```

- production ，小于 5kb 的图片用 url-loader 形式产出 base64 ，否则沿用 file-loader 形式产出 url

  ```js
  module.exports = merge(webpackCommonConf, {
    mode: 'production',
    module: {
      rules: [
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
        }
      ]
    },
  }
  ```
  

