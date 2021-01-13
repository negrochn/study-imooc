# 从基础到实战 手把手带你掌握新版 webpack5

## webpack 初探

webpack 是一个用于现代 JS 应用程序的静态模块打包工具（module bundler）。



**设置淘宝镜像**

1. 设置镜像，执行 `npm set registry http://registry.npm.taobao.org/`
2. 查看镜像，执行 `npm get registry`



### webpack 的正确安装方式

#### 搭建环境

1. 创建并进入 webpack 文件夹

2. 初始化项目，执行 `npm init -y`

3. 安装 webpack 和 webpack-cli ，执行 `npm i webpack webpack-cli -D`

4. 创建并进入 src 文件夹，创建 index.js

   ```js
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
     return elem
   }
   
   document.body.appendChild(component())
   ```

5. 创建 index.html 文件

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>webpack</title>
   </head>
   <body>
     <script src="./src/index.js"></script>
   </body>
   </html>
   ```

6. 修改 package.json 文件

   ```diff
   {
   - "main": "index.js", // 移除 main 入口
   + "private": true, // 确保安装包是私有的，防止意外发布
   }
   ```

7. 执行 `npx webpack` ，看到生成 dist/main.js 文件

8. 复制 index.html 到 dist 文件夹，并修改 dist/index.html 文件

   ```diff
   - <script src="./src/index.js"></script>
   + <script src="./bundle.js"></script>
   ```

9. 打开浏览器访问 dist/index.html ，看到 Hello webpack



### 使用 webpack 的配置文件

1. 创建 webpack.config.js 文件

   ```js
   const path = require('path')
   
   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist')
     }
   }
   ```

2. 修改 package.json 文件

   ```json
   {
     "scripts": {
       "build": "webpack"
     }
   }
   ```

3. 执行 `npm run build` ，看到生成 dist/bundle.js 文件



## webpack 的核心概念

### 使用 Loader 打包静态资源（图片篇）

url-loader 功能类似于 file-loader ，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURI 。

1. 安装 url-loader ，执行 `npm i url-loader -D`

2. 修改 webpack.config.js 文件

   ```js
   module.exports = {
     module: {
       rules: [
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
     }
   }
   ```

3. 修改 src/index.js 文件

   ```diff
   +import Icon from './Lynk&Co.jpg'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
     elem.classList.add(style.hello)
   
   + const myIcon = new Image()
   + myIcon.src = Icon
   + elem.appendChild(myIcon)
   
     return elem
   }
   ```

4. 运行 `npm run build` ，打开浏览器访问 dist/index.html ，看到图片正常显示



### 使用 Loader 打包静态资源（样式篇）

1. 安装 style-loader 、css-loader 、postcss-loader ，执行 `npm i style-loader css-loader postcss-loader -D`

2. 安装 autoprefixer ，执行 `npm i autoprefixer -D`

3. 安装 sass-loader 和 node-sass ，执行 `npm i sass-loader node-sass -D`

4. 修改 webpack.config.js 文件

   ```js
   module.exports = {
     module: {
       rules: [
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
         }
       ]
     }
   }
   ```
   
5. 修改 postcss.config.js 文件

   ```js
   module.exports = {
     plugins: [
       require('autoprefixer')
     ]
   }
   ```

6. 修改 package.json 文件

   ```js
   {
     "browserslist": [
       "last 1 version",
       "> 1%",
       "IE 10"
     ]
   }
   ```

7. 进入 src 文件夹，创建 style.scss 文件

   ```scss
   $body-color: red;
   
   .hello {
     color: $body-color;
     transform: translate(100px, 100px);
   }
   ```

8. 修改 src/index.js 文件

   ```diff
   -import './style.scss'
   +import style from './style.scss'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
   - elem.classList.add('hello')
   + elem.classList.add(style.hello)
     return elem
   }
   
   document.body.appendChild(component())
   ```

9. 运行 `npm run build` ，打开浏览器访问 dist/index.html ，看到红色字体的 Hello webpack

10. 查看页面的 \<head> 标签，包含 style 块元素，且包含厂商前缀



### 使用 Plugins 让打包更便捷

plugin 可以在 webpack 运行到某个时刻时，帮我们做一些事情。

#### 设置 HtmlWebpackPlugin

html-webpack-plugin 会在打包结束后，自动生成一个 HTML 文件，并把打包生成的 JS 自动引入到这个 HTML 文件中。

1. 安装 html-webpack-plugin ，执行 `npm i html-webpack-plugin -D`

2. 修改 webpack.config.js 文件

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     plugins: [
       new HtmlWebpackPlugin({
         template: 'index.html'
       })
     ]
   }
   ```

3. 运行 `npm run build` ，会看到 dist 文件夹下自动创建了一个新的 index.html 文件，所有的 bundle 会自动添加到该文件中



#### 清理 dist 文件夹

1. 安装 clean-webpack-plugin ，执行 `npm i clean-webpack-plugin -D`

2. 修改 webpack.config.js 文件

   ```js
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   
   module.exports = {
     plugins: [
       new CleanWebpackPlugin()
     ]
   }
   ```

3. 运行 `npm run build` ，检查 dist 文件夹是否被清理过



### Entry 与 Output 的基础配置

```js
// wepback.config.js

module.exports = {
  entry: {
    main: './src/index.js' // 可以使用对象形式配置多个文件
  },
  output: {
    // publicPath: 'https://www.negro.chn/', // 如果项目中的静态资源上传到 CDN ，可以通过配置 publicPath 添加前缀
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
}
```



### SourceMap 的配置

| 关键字     | 说明                                            |
| ---------- | ----------------------------------------------- |
| inline     | 将 .map 作为 DataURI 嵌入，不单独生成 .map 文件 |
| eval       | 使用 eval 包裹模块代码                          |
| cheap      | 不包含列信息，也不包含 loader 的 SourceMap      |
| module     | 包含 loader 的 SourceMap                        |
| source-map | 生成 .map 文件                                  |

在 Chrome （版本 87.0.4280.141），只有 eval 模式包含列信息。



#### eval 和 source-map 的关系

1. eval 和 source-map 都是 devtool 的配置项

2. eval 将 webpack 中每个模块包裹，然后在模块末尾添加 //# sourceURL ，依靠 sourceURL 找到原始代码的位置

   ![eval](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/eval.png)

3. 包含 source-map 关键字的配置项都会产生一个 .map 文件，该文件保存有原始代码与运行代码的映射关系

4. 包含 inline 关键字的配置项也会产生 .map 文件，但是该文件是经过 base64 编码作为 DataURI 嵌入

   ![inline-source-map](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/inline-source-map.png)

5. eval-source-map 是 eval 和 source-map 的组合，使用 eval 语句包裹模块，也产生了 .map 文件，该文件作为 DataURI 替换 eval 模式中末尾的 //# sourceURL

   ![eval-source-map](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/eval-source-map.png)



#### cheap 不包含列信息是什么意思？

1. 包含 cheap 关键字，则产生的 .map 文件不包含列信息，即光标只定位到行数，不定位到具体字符位置
   
   ![cheap-source-map 光标](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/cheap-source-map%20%E5%85%89%E6%A0%87.png)
   
2. 不包含 cheap 关键字，将定位到字符位置

   ![eval 光标](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/eval%20%E5%85%89%E6%A0%87.png)



#### devtool 最佳实践

| mode        | devtool                          |
| ----------- | -------------------------------- |
| development | eval-cheap-module-source-map     |
| production  | 省略或者 cheap-module-source-map |



### 使用 WebpackDevServer 提升开发效率

在每次编译代码时，手动运行 `npm run build` 会显得很麻烦。

webpack 提供以下方式，帮助在代码发生变化后自动编译：

1. webpack 的 watch mode
2. **webpack-dev-server**
3. webpack-dev-middleware



#### 使用 watch mode

可以监听文件变化自动编译，但不会自动刷新页面。

1. 修改 package.json 文件

   ```diff
   {
     "script": {
   +   "watch": "webpack --watch"
     }
   }
   ```

2. 修改 webpack.config.js 文件

   ```diff
   module.exports = {
     plugins: [
   -   new CleanWebpackPlugin()
   +   new CleanWebpackPlugin({
   +     cleanStaleWebpackAssets: false // 防止 watch 触发增量构建后删除 index.html 文件
   +   })
     ]
   }
   ```

3. 运行 `npm run watch` ，会看到 webpack 如何编译代码，且没有退出命令行

4. 任意修改 index.js 文件，看到 webpack 自动重新编译



#### 使用 webpack-dev-server

1. 安装 webpack-dev-server ，运行 `npm i webpack-dev-server -D`

2. 修改 webpack.config.js 文件

   ```diff
   module.exports = {
   + devServer: {
   +   contentBase: './dist', // 告诉服务器内容的来源
   +   open: true // 在服务器启动后打开浏览器
   + },
   + target: process.env.NODE_ENV === 'production' ? 'browserslist' : 'web'
   }
   ```

3. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   +   "start": "webpack serve"
     }
   }
   ```

4. 运行 `npm run start` ，会看到浏览器自动加载页面，任意修改 index.js 文件，web server 将在编译代码后自动重新加载

> webpack 5 需要设置 `target: 'web'` 才能开启页面自动刷新。



#### 使用 webpack-dev-middleware

用 webpack-dev-middleware 配合 express 简单模拟 webpack-dev-server 。

可以监听文件变化自动编译，但不会自动刷新页面。

1. 安装 webpack-dev-middleware 和 express ，运行 `npm i webpack-dev-middleware express -D`

2. 新建 server.js 文件

   ```js
   const express = require('express')
   const webpack = require('webpack')
   const webpackDevMiddleware = require('webpack-dev-middleware')
   
   const app = express()
   const config = require('./webpack.config.js')
   const compiler = webpack(config)
   
   app.use(webpackDevMiddleware(compiler, {}))
   
   app.listen(3000, () => {
     console.log('server listening on port 3000!\n')
   })
   ```

3. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   +   "server": "node server.js"
     }
   }
   ```

4. 运行 `npm run server` ，打开浏览器访问 http://localhost:3000



### Hot Module Replacement 热模块更新

HMR 允许在运行时更新所有类型的模块，而无需完全刷新。HMR 不适用于生产环境。



#### HMR 加载样式

1. 修改 webpack.config.js 文件

   ```diff
   +const webpack = require('webpack')
   
   module.exports = {
     devServer: {
       contentBase: './dist', // 告诉服务器内容的来源
       open: true, // 在服务器启动后打开浏览器
   +   hot: true, // 开启热模块更新
   +   hotOnly: true // 即使热模块更新失败，也不让浏览器自动刷新
     },
     plugins: [
   +   new webpack.HotModuleReplacementPlugin()
     ]
   }
   ```

2. 运行 `npm run start` ，会看到浏览器自动加载页面

3. 修改 src/style.scss 文件，会看到 Hello webpack 字体自动从红色变为绿色

   ```diff
   -$body-color: red;
   +$body-color: green;
   ```



#### HMR 加载 JS

1. 进入 src 文件夹，新建 print.js 文件

   ```js
   export default function printMe() {
     console.log('I get called from print.js!')
   }
   ```

2. 修改 src/index.js 文件

   ```diff
   +import printMe from './print.js'
   
   +if (module.hot) {
   + module.hot.accept('./print.js', () => {
   +   console.log('Accepting the updated printMe module!')
   +   printMe()
   + })
   +}
   ```

3. 运行 `npm run start` ，修改 src/print.js 文件

   ```diff
   export default function printMe() {
   - console.log('I get called from print.js!')
   + console.log('Updating print.js...')
   }
   ```

4. 看到浏览器控制面板打印 `Updating print.js...`



对于 JS ，额外使用 `module.hot.accept` 监控变动的文件，并在回调中处理变化后需要做的事；对于 CSS ，style-loader 内置了 `module.hot.accpet` ，不需要额外处理。



### 使用 Babel 处理 ES6 语法

1. 安装 babel-loader 和 @babel/core ，运行 `npm i babel-loader @babel/core -D`

2. 修改 webpack.config.js 文件

   ```js
   module.exports = {
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: ['babel-loader']
         }
       ]
   }
   ```

3. 安装 @babel/preset-env ，运行 `npm i @babel/preset-env -D`

4. 新建 .babelrc 文件

   ```json
   {
     "presets": ["@babel/preset-env"]
   }
   ```

5. 运行 `npm run build` ，看到 dist/main.js 文件中箭头函数、let/const 等 ES6 语法已转换为 ES5 语法



#### babel-polyfill（按需加载）

- Babel 7.4 之后弃用 babel-polyfill
- 推荐直接使用 core-js 和 regenerator

1. 安装 @babel/polyfill ，运行 `npm i @babel/polyfill -D`

2. 修改 src/index.js 文件

   ```diff
   +['babel-loader', '@babel/core', '@babel/preset-env'].map(item => `npm i ${item} -D`)
   +Promise.resolve('@babel/polyfill').then(data => data)
   ```

3. 安装 core-js@3 ，运行 `npm i core-js@3 --save`

4. 修改 .babelrc 文件

   ```json
   {
     "presets": [
       [
         "@babel/preset-env",
         {
           "useBuiltIns": "usage",
           "corejs": "3"
         }
       ]
     ]
   }
   ```

5. 安装 cross-env ，运行 `npm i cross-env -D`

6. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   -   "build": "webpack",
   +   "build": "cross-env NODE_ENV=production webpack",
   -   "start": "webpack serve",
   +   "start": "cross-env NODE_ENV=development webpack serve",
     }
   }
   ```

7. 运行 `npm run build` ，打开 IE11 浏览器访问 dist/index.html 文件，看到控制面板没有报错



**target 属性**

| 选项        | 描述                                                    |
| ----------- | ------------------------------------------------------- |
| web         | 1. webpack-dev-server 开启页面自动刷新<br />2. 开启 HMR |
| browserlist | 兼容 IE                                                 |



**babel-polyfill 的问题**

- 会污染全局环境
- 如果做一个独立的 web 系统，则没问题
- 如果做一个第三方的库，则会有问题



#### babel-runtime

1. 安装 @babel/runtime 和 @babel/plugin-transform-runtime ，运行 `npm i @babel/runtime @babel/plugin-transform-runtime -D`

2. 修改 .babelrc 文件

   ```diff
   {
     "presets": [
       [
         "@babel/preset-env",
         {
           "useBuiltIns": "usage",
           "corejs": "3"
         }
       ]
     ],
   + "plugins": [
   +   [
   +     "@babel/plugin-transform-runtime",
   +     {
   +       "absoluteRuntime": false,
   +       "corejs": 3,
   +       "helpers": true,
   +       "regenerator": true,
   +       "useESModules": false
   +     }
   +   ]
   + ]
   }
   ```

3. 安装 @babel/runtime-corejs3 ，运行 `npm i @babel/runtime-corejs3 -D`

4. 运行 `npm run build`



### webpack 实现对 React 框架代码的打包

1. 安装 @babel/preset-react ，运行 `npm i @babel/preset-react -D`

2. 修改 .babelrc 文件

   ```diff
   {
     "presets": [
       [
         "@babel/preset-env",
         {
           "useBuiltIns": "usage",
           "corejs": "3"
         }
       ],
   +   "@babel/preset-react"
     ],
   - "plugins": [
   -   [
   -     "@babel/plugin-transform-runtime",
   -     {
   -       "absoluteRuntime": false,
   -       "corejs": 3,
   -       "helpers": true,
   -       "regenerator": true,
   -       "useESModules": false
   -     }
   -   ]
   - ]
   }
   ```

3. 安装 react 和 react-dom ，运行 `npm i react react-dom --save`

4. 修改 src/index.js 文件

   ```js
   import React, { Component } from 'react'
   import ReactDOM from 'react-dom'
   
   class App extends Component {
     render() {
       return (
         <div>Hello World</div>
       )
     }
   }
   
   ReactDOM.render(<App />, document.getElementById('root'))
   ```

5. 修改 index.html 文件

   ```diff
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>webpack</title>
   </head>
   <body>
   + <div id="root"></div>
   </body>
   </html>
   ```

6. 运行 `npm run start` ，会看到浏览器自动加载页面，成功显示 Hello World



## webpack 的高级概念

### Tree Shaking 概念详解

1. 进入 src 文件夹，新建 math.js 文件

   ```js
   export const add = (a, b) => {
     return a + b
   }
   
   export const minus = (a, b) => {
     return a - b
   }
   ```

2. 修改 src/index.js 文件

   ```js
   import { add } from './math'
   
   console.log(add(1, 2))
   ```

3. 运行 `npm run build` ，查看 dist/main.js 文件，发现没有使用的 minus 函数也打包到 dist/main.js 文件中

   ![未使用 Tree Shaking 打包]()



#### Tree Shaking

- 移除未引用的代码
- 只支持 ES Module 的引入



**development** 环境

1. 修改 webpack.config.js 文件

   ```diff
   module.exports = {
   + optimization: {
   +   usedExports: true
   + },
   }
   ```

2. 修改 package.json 文件

   ```diff
   {
   + "sideEffects": false, // 设置 sideEffects ，如 ["*.css"] ，表示不需要被 Tree Shaking
   }
   ```

3. 运行 `npm run build` ，查看 dist/index.html 文件，发现虽然仍然有 minus 函数，但 `/* unused harmony export minus */`

   ![使用 Tree Shaking 打包]()



**production 环境**

production 环境默认开启 Tree Shaking 。

1. 修改 webpack.config.js 文件

   ```diff
   module.exports = {
   - mode: 'development',
   + mode: 'production',
   - devtool: 'eval-cheap-module-source-map',
   + devtoll: 'eval-cheap-source-map',
   - optimization: {
   -   usedExports: true
   - },
   }
   ```

2. 运行 `npm run build` ，查看 dist/index.html 文件，期望结果是没有 minus 函数，但实际发现仍存在 minus 函数

   ![使用 production 默认开启 Tree Shaking]()



### development 和 production 模式的区分打包

1. 安装 webpack-merge ，运行 `npm i webpack-merge -D`

2. 新建 build 文件夹，将 webpack.config.js 文件移动到 build 文件夹，并改名为 webpack.common.js

3. 修改 build/webpack.common.js 文件

   ```js
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
     ]
   }
   ```

4. 进入 build 文件夹，新建 webpack.dev.js 文件

   ```js
   const path = require('path')
   const webpack = require('webpack')
   const { merge } = require('webpack-merge')
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
       new webpack.HotModuleReplacementPlugin()
     ],
     optimization: {
       usedExports: true
     },
     target: 'web'
   })
   ```

5. 进入 build 文件夹，新建 webpack.prod.js 文件

   ```js
   const { merge } = require('webpack-merge')
   const commonConfig = require('./webpack.common.js')
   
   module.exports = merge(commonConfig, {
     mode: 'production',
     devtool: 'eval-cheap-source-map',
     target: 'browserslist'
   })
   ```

6. 修改 package.json 文件

   ```js
   {
     "scripts": {
       "dev": "webpack serve --config ./build/webpack.dev.js",
       "build": "webpack --config ./build/webpack.prod.js"
     },
   }
   ```

7. 运行 `npm run dev` ，会看到浏览器自动加载页面，控制面板没有报错

8. 运行 `npm run build` ，打开浏览器访问 dist/index.html 文件，控制面板没有报错

