# 从基础到实战 手把手带你掌握新版 webpack5

## webpack 初探

webpack 是一个用于现代 JS 应用程序的静态模块打包工具（module bundler）。



**设置淘宝镜像**

1. 设置镜像，执行 `npm set registry http://registry.npm.taobao.org/`
2. 查看镜像，执行 `npm get registry`



### webpack 的正确安装方式

#### 搭建环境

1. 创建并进入 webpack5 文件夹

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
     <title>webpack5</title>
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

7. 运行 `npx webpack` ，会看到生成 dist/main.js 文件

8. 复制 index.html 到 dist 文件夹，并修改 dist/index.html 文件

   ```diff
   - <script src="./src/index.js"></script>
   + <script src="./main.js"></script>
   ```

9. 打开浏览器访问 dist/index.html ，看到 Hello webpack

   ```diff
   └─webpack5
       │  index.html
       │  package-lock.json
       │  package.json
       ├─dist
       │      index.html
       │      main.js
       └─src
              index.js
   ```

   

### 使用 webpack 的配置文件

1. 创建并进入 build-base-conf 文件夹，创建 webpack.config.js 文件

   ```js
   const path = require('path')
   
   module.exports = {
     mode: 'development',
     entry: './src/index.js', // 此处相对于 package.json 的文件路径
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, '../dist') // 此处相对于 build-base-conf/webpack.config.js 的文件路径
     }
   }
   ```

2. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   -   "test": "echo \"Error: no test specified\" && exit 1"
   +   "build": "webpack --config build-base-conf/webpack.config.js"
     }
   }
   ```

3. 运行 `npm run build` ，看到生成 dist/bundle.js 文件

   ```diff
   └─webpack5
       │  index.html
       │  package-lock.json
       │  package.json
   +   ├─build-base-conf
   +   │      webpack.config.js
       ├─dist
   +   │      bundle.js
       │      index.html
       │      main.js
       └─src
              index.js
   ```

4. 修改 dist/index.html 文件

   ```diff
   - <script src="./main.js"></script>
   + <script src="./bundle.js"></script>
   ```

5. 打开浏览器访问 dist/index.html ，看到 Hello webpack



## webpack 的核心概念

### 使用 Loader 打包静态资源（图片篇）

url-loader 功能类似于 file-loader ，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURI 。

1. 安装 url-loader ，执行 `npm i url-loader -D`

2. 修改 build-base-conf/webpack.config.js 文件

   ```diff
   module.exports = {
   + module: {
   +   rules: [
   +     {
   +       test: /\.(png|svg|jpg|gif)$/,
   +       use: {
   +         loader: 'url-loader',
   +         options: {
   +           name: '[name]_[hash].[ext]',
   +           outputPath: 'images/',
   +           limit: 20480 // 小于 20kb 以 base64 形式打包到 JS 文件中，否则打包到 images 文件夹下
   +         }
   +       }
   +     }
   +   ]
   + }
   }
   ```

3. 进入 src 文件夹，放入一张 Lynk&Co.jpg 图片

   ```diff
   └─webpack5
       │  index.html
       │  package-lock.json
       │  package.json
       ├─build-base-conf
       │      webpack.config.js
       ├─dist
       │      bundle.js
       │      index.html
       │      main.js
       └─src
              index.js
   +          Lynk&Co.jpg
   ```

4. 修改 src/index.js 文件

   ```diff
   +import Icon from './Lynk&Co.jpg'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
   
   + const myIcon = new Image()
   + myIcon.src = Icon
   + elem.appendChild(myIcon)
   
     return elem
   }
   
   document.body.appendChild(component())
   ```

5. 运行 `npm run build` ，打开浏览器访问 dist/index.html

   ![使用 Loader 打包静态资源（图片篇）](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20Loader%20%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E5%9B%BE%E7%89%87%E7%AF%87%EF%BC%89.png)



### 使用 Loader 打包静态资源（样式篇）

1. 安装 style-loader 、css-loader 、postcss-loader ，执行 `npm i style-loader css-loader postcss-loader -D`

2. 安装 autoprefixer ，执行 `npm i autoprefixer -D`

3. 创建 postcss.config.js 文件

   ```js
   module.exports = {
     plugins: [
       require('autoprefixer')
     ]
   }
   ```

4. 安装 sass-loader 和 node-sass ，执行 `npm i sass-loader node-sass -D`

5. 修改 build-base-conf/webpack.config.js 文件

   ```diff
   module.exports = {
     module: {
       rules: [
   +     {
   +       test: /\.css$/,
   +       use: ['style-loader', 'css-loader', 'postcss-loader'] // 逆序执行
   +     },
   +     {
   +       test: /\.s[ac]ss$/,
   +       use: [
   +         'style-loader',
   +         {
   +           loader: 'css-loader',
   +           options: {
   +             importLoaders: 2, // 经过测试，importLoaders 没有效果
   +             // 0 => no loaders (default)
   +             // 1 => postcss-loader
   +             // 2 => postcss-loader, sass-loader
   +           }
   +         },
   +         'postcss-loader',
   +         'sass-loader'
   +       ]
   +     }
       ]
     }
   }
   ```

6. 修改 package.json 文件

   ```diff
   {
   + "browserslist": [
   +   "last 1 version",
   +   "> 1%",
   +   "IE 10"
   + ]
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

   ```diff
   └─webpack5
       │  index.html
       │  package-lock.json
       │  package.json
   +   │  postcss.config.js
       ├─build-base-conf
       │      webpack.config.js
       ├─dist
       │      bundle.js
       │      index.html
       │      main.js
       └─src
              index.js
              Lynk&Co.jpg
   +          style.scss
   ```

8. 修改 src/index.js 文件

   ```diff
   import Icon from './Lynk&Co.jpg'
   +import './style.scss'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
   + elem.classList.add('hello')
   
     const myIcon = new Image()
     myIcon.src = Icon
     elem.appendChild(myIcon)
   
     return elem
   }
   
   document.body.appendChild(component())
   ```

9. 运行 `npm run build` ，打开浏览器访问 dist/index.html

   ![使用 Loader 打包静态资源（样式篇）](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20Loader%20%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E6%A0%B7%E5%BC%8F%E7%AF%87%EF%BC%89.png)



**开启 CSS Modules**

1. 修改 build-base-conf/webpack.config.js 文件

   ```diff
   module.exports = {
     module: {
       rules: [
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
   +             modules: true // 开启 CSS Modules
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

2. 修改 src/index.js 文件

   ```diff
   import Icon from './Lynk&Co.jpg'
   -import './style.scss'
   +import style from './style.scss'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
   - elem.classList.add('hello')
   + elem.classList.add(style.hello)
   
     const myIcon = new Image()
     myIcon.src = Icon
     elem.appendChild(myIcon)
   
     return elem
   }
   
   document.body.appendChild(component())
   ```

3. 运行 `npm run build` ，打开浏览器访问 dist/index.html

   ![使用 Loader 打包静态资源（样式篇）](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20Loader%20%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E6%A0%B7%E5%BC%8F%E7%AF%87%EF%BC%89.png)



### 使用 Plugins 让打包更便捷

plugin 可以在 webpack 运行到某个时刻时，帮我们做一些事情。



#### 设置 HtmlWebpackPlugin

html-webpack-plugin 会在打包结束后，自动生成一个 HTML 文件，并把打包生成的 JS 自动引入到这个 HTML 文件中。

1. 安装 html-webpack-plugin ，执行 `npm i html-webpack-plugin -D`

2. 修改 build-base-conf/webpack.config.js 文件

   ```diff
   +const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
   + plugins: [
   +   new HtmlWebpackPlugin({
   +     template: 'index.html'
   +   })
   + ]
   }
   ```

3. 修改 index.html 文件

   ```diff
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>webpack5</title>
   </head>
   <body>
   - <script src="./src/index.js"></script>
   </body>
   </html>
   ```

4. 运行 `npm run build` ，会看到 dist 文件夹下自动创建了一个新的 index.html 文件，所有的 bundle 会自动添加到该文件中

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>webpack5</title>
   </head>
   <body>
   <script src="bundle.js"></script></body>
   </html>
   ```



#### 清理 dist 文件夹

1. 安装 clean-webpack-plugin ，执行 `npm i clean-webpack-plugin -D`

2. 修改 build-base-conf/webpack.config.js 文件

   ```diff
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   +const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   
   module.exports = {
     plugins: [
       new HtmlWebpackPlugin({
         template: 'index.html'
       }),
   +   new CleanWebpackPlugin()
     ]
   }
   ```

3. 运行 `npm run build` ，会看到 dist/main.js 文件被删除，即 dist 文件夹被清理过

   ```diff
   └─webpack5
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       ├─build-base-conf
       │      webpack.config.js
       ├─dist
       │      bundle.js
       │      index.html
   -   │      main.js
       └─src
              index.js
              Lynk&Co.jpg
              style.scss
   ```



### Entry 与 Output 的基础配置

1. 修改 build-base-conf/webpack.config.js 文件

   ```diff
   module.exports = {
   - entry: './src/index.js' // 此处相对于 package.json 的文件路径
   + entry: {
   +   main: './src/index.js' // 可以使用对象形式配置多个文件
   + },
     output: {
   +   // publicPath: 'https://www.negro.chn/', // 如果项目中的静态资源上传到 CDN ，可以通过配置 publicPath 添加前缀
   -   filename: 'bundle.js',
   +   filename: '[name].js',
       path: path.resolve(__dirname, '../dist') // 此处相对于 build-base-conf/webpack.config.js 的文件路径
     },
   }
   ```

2. 运行 `npm run build` ，会看到生成 dist/main.js 文件

   ```diff
   └─webpack5
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       ├─build-base-conf
       │      webpack.config.js
       ├─dist
       │      index.html
   -   │      bundle.js
   +   │      main.js
       └─src
              index.js
              Lynk&Co.jpg
              style.scss
   ```



### 使用 WebpackDevServer 提升开发效率

在每次编译代码时，手动运行 `npm run build` 会显得很麻烦。

webpack 提供以下方式，帮助在代码发生变化后自动编译：

1. webpack 的 watch mode
2. **webpack-dev-server**
3. webpack-dev-middleware



#### 使用 watch mode

可以监听文件变化自动编译，但不会自动刷新页面。

1. 修改 build-base-conf/webpack.config.js 文件

   ```diff
   module.exports = {
     plugins: [
       new HtmlWebpackPlugin({
         template: 'index.html'
       }),
   -   new CleanWebpackPlugin()
   +   new CleanWebpackPlugin({
   +     cleanStaleWebpackAssets: false // 防止 watch 触发增量构建后删除 index.html 文件
   +   })
     ]
   }
   ```

2. 修改 package.json 文件

   ```diff
   {
     "script": {
       "build": "webpack --config build-base-conf/webpack.config.js",
   +   "watch": "webpack --watch --config build-base-conf/webpack.config.js"
     }
   }
   ```

3. 运行 `npm run watch` ，会看到 webpack 如何编译代码，且没有退出命令行

   ![npm run watch 没有退出命令行](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/npm%20run%20watch%20%E6%B2%A1%E6%9C%89%E9%80%80%E5%87%BA%E5%91%BD%E4%BB%A4%E8%A1%8C.png)

4. 任意修改 src/index.js 文件，会看到 webpack 自动编译，但不会自动刷新页面

   ```diff
   import Icon from './Lynk&Co.jpg'
   import style from './style.scss'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
   - elem.classList.add(style.hello)
   
     const myIcon = new Image()
     myIcon.src = Icon
     elem.appendChild(myIcon)
   
     return elem
   }
   
   document.body.appendChild(component())
   ```



#### 使用 webpack-dev-server

1. 安装 webpack-dev-server ，运行 `npm i webpack-dev-server -D`

2. 修改 build-base-conf/webpack.config.js 文件

   ```diff
   module.exports = {
   + devServer: {
   +   contentBase: './dist', // 告诉服务器内容的来源
   +   open: true // 在服务器启动后打开浏览器
   + },
   + target: 'web', // 浏览器自动刷新需要开启 target: 'web'
   }
   ```

3. 修改 package.json 文件

   ```diff
   {
     "scripts": {
       "build": "webpack --config build-base-conf/webpack.config.js",
       "watch": "webpack --watch --config build-base-conf/webpack.config.js",
   +   "start": "webpack serve --config build-base-conf/webpack.config.js"
     }
   }
   ```

4. 运行 `npm run start` ，会看到浏览器自动访问 http://localhost:8080/ ，任意修改 src/index.js 文件，web server 自动编译且自动刷新页面

   ```diff
   import Icon from './Lynk&Co.jpg'
   import style from './style.scss'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
   + elem.classList.add(style.hello)
   
     const myIcon = new Image()
     myIcon.src = Icon
     elem.appendChild(myIcon)
   
     return elem
   }
   
   document.body.appendChild(component())
   ```



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
   const config = require('./build-base-conf/webpack.config')
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
       "build": "webpack --config build-base-conf/webpack.config.js",
       "watch": "webpack --watch --config build-base-conf/webpack.config.js",
       "start": "webpack serve --config build-base-conf/webpack.config.js",
   +   "server": "node server.js"
     },
   }
   ```

4. 运行 `npm run serve` ，打开浏览器访问 http://localhost:3000/

   ![使用 webpack-dev-middleware](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20webpack-dev-middleware.png)



### Hot Module Replacement 热模块更新

HMR 允许在运行时更新所有类型的模块，而无需完全刷新。HMR 不适用于生产环境。

1. 新建 build-hmr-conf 文件夹，将 build-base-conf/webpack.config.js 文件复制到 build-hmr-conf 文件夹下

   ```diff
   └─webpack5
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       │  server.js
       ├─build-base-conf
       │      webpack.config.js
   +   ├─build-hmr-conf
   +   │      webpack.config.js
       ├─dist
       └─src
              index.js
              Lynk&Co.jpg
              style.scss
   ```

2. 修改 build-hmr-conf/webpack.config.js 文件

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
       new HtmlWebpackPlugin({
         template: 'index.html'
       }),
       new CleanWebpackPlugin({
         cleanStaleWebpackAssets: false // 防止 watch 触发增量构建后删除 index.html 文件
       }),
   +   new webpack.HotModuleReplacementPlugin()
     ]
   }
   ```

3. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   -   "start": "webpack serve --config build-base-conf/webpack.config.js",
   +   "start": "webpack serve --config build-hmr-conf/webpack.config.js",
     }
   }
   ```

4. 运行 `npm run start` ，会看到浏览器自动访问 http://localhost:8080/

5. 修改 src/style.scss 文件，会看到 Hello webpack 字体从红色变为绿色

   ```diff
   -$body-color: red;
   +$body-color: green;
   
   .hello {
     color: $body-color;
     transform: translate(100px, 100px);
   }
   ```

   ![Hot Module Replacement CSS](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Hot%20Module%20Replacement%20CSS.gif)



#### HMR 加载 JS

1. 进入 src 文件夹，新建 print.js 文件

   ```js
   export default function printMe() {
     console.log('I get called from print.js!')
   }
   ```

   ```diff
   └─webpack5
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       │  server.js
       │  
       ├─build-base-conf
       │      webpack.config.js
       │      
       ├─build-hmr-conf
       │      webpack.config.js
       ├─dist
       └─src
              index.js
              Lynk&Co.jpg
   +          print.js
              style.scss
   ```

2. 修改 src/index.js 文件

   ```diff
   import Icon from './Lynk&Co.jpg'
   import style from './style.scss'
   +import printMe from './print.js'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
     elem.classList.add(style.hello)
   
     const myIcon = new Image()
     myIcon.src = Icon
     elem.appendChild(myIcon)
   
     return elem
   }
   
   document.body.appendChild(component())
   
   +if (module.hot) {
   + module.hot.accept('./print.js', () => {
   +   console.log('Accepting the updated printMe module!')
   +   printMe()
   + })
   }
   ```

3. 运行 `npm run start` ，会看到浏览器自动访问 http://localhost:8080/

4. 修改 src/print.js 文件，会看到控制台打印 `Updating print.js...`

   ```diff
   export default function printMe() {
   - console.log('I get called from print.js!')
   + console.log('Updating print.js...')
   }
   ```

   ![Hot Module Replacement JS](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Hot%20Module%20Replacement%20JS.gif)

对于 JS ，额外使用 `module.hot.accept` 监控变动的文件，并在回调中处理变化后需要做的事；对于 CSS ，style-loader 内置了 `module.hot.accpet` ，不需要额外处理。



### 使用 Babel 处理 ES6 语法

1. 新建 build-babel-conf 文件夹，将 build-hmr-conf/webpack.config.js 文件复制到 build-babel-conf 文件夹下

2. 安装 babel-loader 和 @babel/core ，运行 `npm i babel-loader @babel/core -D`

3. 修改 build-babel-conf/webpack.config.js 文件

   ```diff
   module.exports = {
     module: {
       rules: [
   +     {
   +       test: /\.js$/,
   +       exclude: /node_modules/,
   +       use: ['babel-loader']
   +     }
       ]
     },
   }
   ```

4. 安装 @babel/preset-env ，运行 `npm i @babel/preset-env -D`

5. 新建 .babelrc 文件

   ```json
   {
     "presets": ["@babel/preset-env"]
   }
   ```

   ```diff
   └─webpack5
   +   │  .babelrc
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       │  server.js
   +   ├─build-babel-conf
   +   │      webpack.config.js
       ├─build-base-conf
       │      webpack.config.js
       ├─build-hmr-conf
       │      webpack.config.js
       ├─dist
       └─src
              index.js
              Lynk&Co.jpg
              print.js
              style.scss
   ```

6. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   -   "build": "webpack --config build-base-conf/webpack.config.js",
   +   "build": "webpack --config build-babel-conf/webpack.config.js",
     }
   }
   ```

7. 运行 `npm run build` ，会看到 dist/main.js 文件中 let/const 、箭头函数等 ES6 语法已转换为 ES5 语法

   ![使用 Babel 处理 ES6 语法](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20Babel%20%E5%A4%84%E7%90%86%20ES6%20%E8%AF%AD%E6%B3%95.png)



#### babel-polyfill（按需加载）

- Babel 7.4 之后弃用 babel-polyfill
- 推荐直接使用 core-js 和 regenerator

1. 安装 @babel/polyfill ，运行 `npm i @babel/polyfill -D`

2. 安装 core-js@3 ，运行 `npm install --save core-js@3`

3. 修改 .babelrc 文件

   ```diff
   {
   - "presets": ["@babel/preset-env"]
   + "presets": [
   +   [
   +     "@babel/preset-env",
   +     {
   +       "useBuiltIns": "usage",
   +       "corejs": "3"
   +     }
   +   ]
   + ]
   }
   ```

4. 修改 src/index.js 文件

   ```diff
   +['babel-loader', '@babel/core', '@babel/preset-env'].map(item => `npm i ${item} -D`)
   +Promise.resolve('@babel/polyfill').then(data => data)
   ```

5. 运行 `npm run build` ，打开 IE11 访问 dist/index.html 文件

   ![使用 babel-polyfill IE11 报错](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20babel-polyfill%20IE11%20%E6%8A%A5%E9%94%99.png)

6. 修改 build-babel-conf/webpack.config.js 文件

   ```diff
   module.exports = {
   - target: 'web',
   + target: 'browserslist',
   }
   ```

7. 运行 `npm run build` ，打开 IE11 访问 dist/index.html 文件

   ![使用 babel-polyfill IE11 不报错](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20babel-polyfill%20IE11%20%E4%B8%8D%E6%8A%A5%E9%94%99.png)



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

1. 取消 babel-polyfill 的配置

   ```diff
   {
   + "presets": ["@babel/preset-env"]
   - "presets": [
   -   [
   -     "@babel/preset-env",
   -     {
   -       "useBuiltIns": "usage",
   -       "corejs": "3"
   -     }
   -   ]
   - ]
   }
   ```

   ![使用 babel-runtime 前 IE11 报错](https://github.com/negrochn/study-imooc/blob/master/316/img/%E4%BD%BF%E7%94%A8%20babel-runtime%20%E5%89%8D%20IE11%20%E6%8A%A5%E9%94%99.png?raw=true)

2. 安装 @babel/runtime 和 @babel/plugin-transform-runtime ，运行 `npm i @babel/runtime @babel/plugin-transform-runtime -D`

3. 修改 .babelrc 文件

   ```diff
   {
     "presets": ["@babel/preset-env"],
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

4. 运行 `npm run build` ，打开 IE11 访问 dist/index.html 文件

   ![使用 babel-runtime IE11 不报错](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20babel-runtime%20IE11%20%E4%B8%8D%E6%8A%A5%E9%94%99.png)



### webpack 实现对 React 框架代码的打包

1. 新建 build-react-conf 文件夹，将 build-babel-conf/webpack.config.js 文件复制到 build-react-conf 文件夹下

2. 安装 @babel/preset-react ，运行 `npm i @babel/preset-react -D`

3. 修改 .babelrc 文件

   ```diff
   {
   - "presets": ["@babel/preset-env"],
   + "presets": ["@babel/preset-env", "@babel/preset-react"],
   }
   ```

4. 安装 react 和 react-dom ，运行 `npm i react react-dom --save`

5. 进入 src 文件夹，新增 react.jsx 文件

   ```jsx
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

6. 新增 react.html 文件

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>webpack5</title>
   </head>
   <body>
     <div id="root"></div>
   </body>
   </html>
   ```

7. 修改 build-react-conf/webpack.config.js 文件

   ```diff
   module.exports = {
     entry: {
   -   main: './src/index.js'
   +   main: './src/react.jsx'
     },
     module: {
       rules: [
        {
   -       test: /\.js$/,
   +       test: /\.jsx?$/,
           exclude: /node_modules/,
           use: ['babel-loader']
         }
       ]
     },
     plugins: [
       new HtmlWebpackPlugin({
   -     template: 'index.html'
   +     template: 'react.html'
       }),
       new CleanWebpackPlugin({
         cleanStaleWebpackAssets: false // 防止 watch 触发增量构建后删除 index.html 文件
       }),
       new webpack.HotModuleReplacementPlugin()
     ]
   }
   ```

   ```diff
   └─webpack5
       │  .babelrc
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
   +   │  react.html
       │  server.js
       ├─build-babel-conf
       │      webpack.config.js
       ├─build-base-conf
       │      webpack.config.js
       ├─build-hmr-conf
       │      webpack.config.js
   +   ├─build-react-conf
   +   │      webpack.config.js
       ├─dist
       │      index.html
       │      main.js
       └─src
               index.js
               Lynk&Co.jpg
               print.js
   +           react.jsx
               style.scss
   ```

8. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   -   "build": "webpack --config build-babel-conf/webpack.config.js",
   +   "build": "webpack --config build-react-conf/webpack.config.js",
     }
   }
   ```

9. 运行 `npm run build` ，打开浏览器访问 dist/index.html 文件

   ![webpack 实现对 React 框架代码的打包](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/webpack%20%E5%AE%9E%E7%8E%B0%E5%AF%B9%20React%20%E6%A1%86%E6%9E%B6%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8C%85.png)



## webpack 的高级概念

### development 和 production 模式的区分打包

1. 安装 webpack-merge ，运行 `npm i webpack-merge -D`

2. 新建 build-tree-shaking-conf 文件夹

3. 进入 build-tree-shaking-conf 文件夹，新建 webpack.common.js 文件

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
       path: path.resolve(__dirname, '../dist') // 此处相对于 build-base-conf/webpack.config.js 的文件路径
     },
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
         },
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: ['babel-loader']
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

4. 进入 build-tree-shaking-conf 文件夹，新建 webpack.dev.js 文件

   ```js
   const webpack = require('webpack')
   const { merge } = require('webpack-merge')
   const commonConfig = require('./webpack.common.js')
   
   module.exports = merge(commonConfig, {
     mode: 'development',
     devServer: {
       contentBase: './dist', // 告诉服务器内容的来源
       open: true, // 在服务器启动后打开浏览器
       hot: true, // 开启热模块更新
       hotOnly: true // 即使热模块更新失败，也不让浏览器自动刷新
     },
     target: 'web', // 浏览器自动刷新需要开启 target: 'web'
     plugins: [
       new webpack.HotModuleReplacementPlugin()
     ]
   })
   ```

5. 进入 build-tree-shaking-conf 文件夹，新建 webpack.prod.js 文件

   ```js
   const { merge } = require('webpack-merge')
   const commonConfig = require('./webpack.common.js')
   
   module.exports = merge(commonConfig, {
     mode: 'production',
     target: 'browserslist'
   })
   ```

   ```diff
   └─webpack5
       │  .babelrc
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       │  react.html
       │  server.js
       ├─build-babel-conf
       │      webpack.config.js
       ├─build-base-conf
       │      webpack.config.js
       ├─build-hmr-conf
       │      webpack.config.js
       ├─build-react-conf
       │      webpack.config.js
   +   ├─build-tree-shaking-conf
   +   │      webpack.common.js
   +   │      webpack.dev.js
   +   │      webpack.prod.js
       ├─dist
       └─src
              index.js
              Lynk&Co.jpg
              print.js
              react.jsx
              style.scss
   ```

6. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   -   "build": "webpack --config build-react-conf/webpack.config.js",
   +   "build": "webpack --config build-tree-shaking-conf/webpack.prod.js",
   -   "start": "webpack serve --config build-hmr-conf/webpack.config.js",
   +   "start": "webpack serve --config build-tree-shaking-conf/webpack.dev.js",
     }
   }
   ```

7. 运行 `npm run start` ，会看到浏览器自动访问 http://localhost:8080/ 

8. 运行 `npm run build` ，打开浏览器访问 dist/index.html



### SourceMap 的配置

| 关键字     | 说明                                            |
| ---------- | ----------------------------------------------- |
| inline     | 将 .map 作为 DataURI 嵌入，不单独生成 .map 文件 |
| eval       | 使用 eval 包裹模块代码                          |
| cheap      | 不包含列信息，也不包含 loader 的 SourceMap      |
| module     | 包含 loader 的 SourceMap                        |
| source-map | 生成 .map 文件                                  |



#### eval 和 source-map 是什么关系？

1. eval 和 source-map 都是 devtool 的配置项

2. eval 将 webpack 中每个模块包裹，然后会模块末尾添加 `//# sourceURL` ，依靠 sourceURL 找到原始代码的位置

   ![eval 打包 sourceURL](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/eval%20%E6%89%93%E5%8C%85%20sourceURL.png)

3. 包含 source-map 关键字的配置项都会产生一个 .map 文件，该文件保存有原始代码与运行代码的映射关系

   ![source-map 打包 .map](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/source-map%20%E6%89%93%E5%8C%85%20.map.png)

4. 包含 inline 关键字的配置项也会产生 .map 文件，但是该文件是经过 base64 编码作为 DataURI 嵌入

   ![inline-source-map 打包 sourceMappingURL](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/inline-source-map%20%E6%89%93%E5%8C%85%20sourceMappingURL.png)

5. eval-source-map 是 eval 和 source-map 的组合，使用 eval 语句包裹模块，也产生了 .map 文件，该文件作为 DataURI 替换 eval 模式中末尾的 `//# sourceURL`

   ![eval-source-map 打包](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/eval-source-map%20%E6%89%93%E5%8C%85.png)



#### cheap 不包含列信息是什么意思？

1. 包含 cheap 关键字，则产生的 .map 文件不包含列信息，即光标指定位到行数，不定位到具体字符位置

   ![cheap 打包不包含列信息](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/cheap%20%E6%89%93%E5%8C%85%E4%B8%8D%E5%8C%85%E5%90%AB%E5%88%97%E4%BF%A1%E6%81%AF.png)

2. 不包含 cheap 关键字，将定位到字符位置

   ![非 cheap 打包包含列信息](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E9%9D%9E%20cheap%20%E6%89%93%E5%8C%85%E5%8C%85%E5%90%AB%E5%88%97%E4%BF%A1%E6%81%AF.png)



#### devtool 最佳实践

| mode        | devtool                          |
| ----------- | -------------------------------- |
| development | eval-cheap-module-source-map     |
| production  | 省略或者 cheap-module-source-map |

1. 修改 build-tree-shaking-conf/webpack.dev.js 文件

   ```diff
   module.exports = merge(commonConfig, {
   + devtool: 'eval-cheap-module-source-map',
   })
   ```

2. 修改 build-tree-shaking-conf/webpack.prod.js 文件

   ```diff
   module.exports = merge(commonConfig, {
   + devtool: 'cheap-module-source-map',
   })
   ```



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

   ```diff
   └─webpack5
       │  .babelrc
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       │  react.html
       │  server.js
       ├─build-babel-conf
       │      webpack.config.js
       ├─build-base-conf
       │      webpack.config.js
       ├─build-hmr-conf
       │      webpack.config.js
       ├─build-react-conf
       │      webpack.config.js
       ├─build-tree-shaking-conf
       │      webpack.common.js
       │      webpack.dev.js
       │      webpack.prod.js
       ├─dist
       │      index.html
       │      main.js
       │      main.js.map
       └─src
              index.js
              Lynk&Co.jpg
   +          math.js
              print.js
              react.jsx
              style.scss
   ```

2. 修改 src/index.js 文件

   ```diff
   +import { add } from './math.js'
   
   +console.log(add(1, 2))
   ```

3. 运行 `npx webpack --config build-tree-shaking-conf/webpack.dev.js` ，查看 dist/main.js 文件，发现没有使用的 minus 函数也打包到 dist/main.js 文件中

   ![未使用 Tree Shaking 打包](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E6%9C%AA%E4%BD%BF%E7%94%A8%20Tree%20Shaking%20%E6%89%93%E5%8C%85.png)



#### Tree Shaking

- 移除未引用的代码
- 只支持 ES Module 的引入



**development 环境**

1. 修改 build-tree-shaking-conf/webpack.dev.js 文件

   ```diff
   module.exports = merge(commonConfig, {
   + optimization: {
   +   usedExports: true
   + }
   })
   ```

2. 修改 package.json 文件

   ```diff
   {
   + "sideEffects": false, // 设置 sideEffects ，如 ["*.css"] ，表示不需要被 Tree Shaking
   }
   ```

3. 运行 `npx webpack --config build-tree-shaking-conf/webpack.dev.js` ，查看 dist/main.js 文件，发现虽然仍然有 minus 函数，但 `/* unused harmony export minus */`

   ![使用 Tree Shaking 打包](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/%E4%BD%BF%E7%94%A8%20Tree%20Shaking%20%E6%89%93%E5%8C%85.png)



**production 环境**

默认开启 Tree Shaking 。

运行 `npm run build` ，查看 dist/main.js 文件，发现没有 minus 函数。



### Code Splitting

解决打包文件大，加载时间长的问题，分出第三方库文件。

1. 新建 build-code-splitting-conf 文件夹

2. 将 build-tree-shaking 文件夹下的所有文件拷贝至 build-code-splitting-conf 文件夹

   ```diff
   └─webpack5
       │  .babelrc
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       │  react.html
       │  server.js
       ├─build-babel-conf
       │      webpack.config.js
       ├─build-base-conf
       │      webpack.config.js
   +   ├─build-code-splitting-conf
   +   │      webpack.common.js
   +   │      webpack.dev.js
   +   │      webpack.prod.js
       ├─build-hmr-conf
       │      webpack.config.js
       ├─build-react-conf
       │      webpack.config.js
       ├─build-tree-shaking-conf
       │      webpack.common.js
       │      webpack.dev.js
       │      webpack.prod.js
       ├─dist
       │      index.html
       │      main.js
       │      main.js.map
       └─src
              index.js
              Lynk&Co.jpg
              math.js
              print.js
              react.jsx
              style.scss
   ```

**同步引入模块代码**

1. 修改 build-code-splitting-conf/webpack.common.js 文件

   ```diff
   module.exports = {
   + optimization: {
   +   splitChunks: {
   +     chunks: 'all'
   +   }
   + }
   }
   ```

2. 修改 package.json 文件

   ```diff
   {
     "scripts": {
       "build": "webpack --config build-tree-shaking-conf/webpack.prod.js",
   +   "build:dev": "webpack --config build-code-splitting-conf/webpack.dev.js",
       "watch": "webpack --watch --config build-base-conf/webpack.config.js",
       "start": "webpack serve --config build-tree-shaking-conf/webpack.dev.js",
       "server": "node server.js"
     },
   }
   ```

3. 安装 lodash ，运行 `npm i lodash -D`

4. 修改 src/index.js 文件

   ```js
   // import Icon from './Lynk&Co.jpg'
   // import style from './style.scss'
   // import printMe from './print.js'
   // import { add } from './math.js'
   import _ from 'lodash'
   
   // function component() {
   //   const elem = document.createElement('div')
   //   elem.innerHTML = ['Hello', 'webpack'].join(' ')
   //   elem.classList.add(style.hello)
   
   //   const myIcon = new Image()
   //   myIcon.src = Icon
   //   elem.appendChild(myIcon)
   
   //   return elem
   // }
   
   // document.body.appendChild(component())
   
   // if (module.hot) {
   //   module.hot.accept('./print.js', () => {
   //     console.log('Accepting the updated printMe module!')
   //     printMe()
   //   })
   // }
   
   // ['babel-loader', '@babel/core', '@babel/preset-env'].map(item => `npm i ${item} -D`)
   // Promise.resolve('@babel/polyfill').then(data => data)
   
   // console.log(add(1, 2))
   
   console.log(_.join(['Code', 'Splitting'], ' '))
   ```

5. 运行 `npm run build:dev` ，会看到 dist 文件夹下生成了 venders 前缀的文件（vendors-node_modules_lodash_lodash_js.js）

   ![Code Splitting 打包同步代码](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20%E6%89%93%E5%8C%85%E5%90%8C%E6%AD%A5%E4%BB%A3%E7%A0%81.png)

6. 打开浏览器访问 dist/index.html

   ![Code Splitting 打包同步代码](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20%E6%89%93%E5%8C%85%E5%90%8C%E6%AD%A5%E4%BB%A3%E7%A0%81.gif)



**异步引入模块代码**

1. 修改 build-code-splitting-conf/webpack.common.js 文件

   ```diff
   module.exports = {
   - optimization: {
   -   splitChunks: {
   -     chunks: 'all'
   -   }
   - }
   }
   ```

2. 修改 src/index.js 文件

   ```diff
   -import _ from 'lodash'
   
   -console.log(_.join(['Code', 'Splitting'], ' '))
   
   +function component() {
   + return import('lodash').then(({ default: _ }) => {
   +   const elem = document.createElement('div')
   +   elem.innerHTML = _.join(['lodash', 'join'], ',')
   +   return elem
   + })
   +}
   
   +document.addEventListener('click', () => {
   + component().then(elem => {
   +   document.body.appendChild(elem)
   + })
   +})
   ```

3. 运行 `npm run build:dev` ，会看到 dist 文件夹下生成了 venders 前缀的文件（vendors-node_modules_lodash_lodash_js.js）

4. 打开浏览器访问 dist/index.html

   ![Code Splitting 打包异步代码](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20%E6%89%93%E5%8C%85%E5%BC%82%E6%AD%A5%E4%BB%A3%E7%A0%81.gif)

5. 魔法注释，修改 src/index.js 文件

   ```diff
   function component() {
   - return import('lodash').then(({ default: _ }) => {
   + return import(/* webpackChunkName: 'lodash' */'lodash').then(({ default: _ }) => {
       const elem = document.createElement('div')
       elem.innerHTML = _.join(['lodash', 'join'], ',')
       return elem
     })
   }
   ```

6. 运行 `npm run build:dev` ，会看到 dist 文件夹下生成 lodash.js 文件

   ![Code Splitting 打包魔法注释](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20%E6%89%93%E5%8C%85%E9%AD%94%E6%B3%95%E6%B3%A8%E9%87%8A.png)

7. 打开浏览器访问 dist/index.html

   ![Code Splitting 打包魔法注释](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20%E6%89%93%E5%8C%85%E9%AD%94%E6%B3%95%E6%B3%A8%E9%87%8A.gif)



### SplitChunksPlugin 配置

1. 修改 build-code-splitting-conf/webpack.common.js 文件

   ```diff
   module.exports = {
   + optimization: {
   +   splitChunks: {
   +     // all ：全部 chunk
   +     // async ：异步 chunk ，只处理异步导入的文件
   +     // initial ：入口 chunk ，不处理异步导入的文件
   +     chunks: 'all',
   +     minSize: 0,
   +     minRemainingSize: 0,
   +     minChunks: 1, // 当一个模块被引用至少一次才进行代码分割
   +     maxAsyncRequests: 30, // 同时加载的模块数最多是 30
   +     maxInitialRequests: 30, // 入口文件引入的库最多分割出 30 个
   +     enforceSizeThreshold: 50000,
   +     // 缓存分组
   +     cacheGroups: {
   +       defaultVendors: {
   +         test: /[\\/]node_modules[\\/]/,
   +         priority: -10,
   +         reuseExistingChunk: true, // 如果一个模块已经被打包了，再打包会忽略这个模块
   +         chunks: 'async',
   +         filename: 'vendors.js'
   +       },
   +       default: {
   +         priority: -20,
   +         reuseExistingChunk: true,
   +         chunks: 'initial',
   +         filename: 'common.js'
   +       }
   +     }
   +   }
   + }
   }
   ```

2. 运行 `npm run build:dev` ，会看到 dist 文件夹下生成 common.js 和 venders.js 文件

   ![Code Splitting 配置 splitChunks](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20%E9%85%8D%E7%BD%AE%20splitChunks.png)

3. 打开浏览器访问 dist/index.html

   ![Code Splitting 配置 splitChunks](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20%E9%85%8D%E7%BD%AE%20splitChunks.gif)



### Lazy Loading 懒加载，Chunk 是什么？

Lazy Loading ，是用 import() 来异步按需加载模块，这样能让页面加载更快。

chunk ，指的是项目打包完成后 dist 文件夹下有几个 JS 文件，每个 JS 文件都是 chunk 。



### 打包分析，preload，prefetch

#### 官方分析工具

https://github.com/webpack/analyse

1. 修改 package.json 文件

   ``` diff
   {
     "scripts": {
   +   "analyze": "webpack --config build-code-splitting-conf/webpack.dev.js --profile --json > stats.json"
     }
   }
   ```

2. 运行 `npm run analyze` ，会看到根目录下生成了 stats.json 文件

   ```diff
   └─webpack5
       │  .babelrc
       │  index.html
       │  package-lock.json
       │  package.json
       │  postcss.config.js
       │  react.html
       │  server.js
   +   │  stats.json
       ├─build-babel-conf
       │      webpack.config.js
       ├─build-base-conf
       │      webpack.config.js
       ├─build-code-splitting-conf
       │      webpack.common.js
       │      webpack.dev.js
       │      webpack.prod.js
       ├─build-hmr-conf
       │      webpack.config.js
       ├─build-react-conf
       │      webpack.config.js
       ├─build-tree-shaking-conf
       │      webpack.common.js
       │      webpack.dev.js
       │      webpack.prod.js
       ├─dist
       │      common.js
       │      index.html
       │      vendors.js
       └─src
               index.js
               Lynk&Co.jpg
               math.js
               print.js
               react.jsx
               style.scss
   ```

3. 可以将 stats.json 文件上传到 http://webpack.github.io/analyse/ 或 https://alexkuz.github.io/webpack-chart/ ，进行 bundle 分析



#### 推荐使用 webpack-bundle-analyzer

https://github.com/webpack-contrib/webpack-bundle-analyzer

1. 安装 webpack-bundle-analyzer ，运行 `npm i webpack-bundle-analyzer -D`

2. 修改 build-code-splitting-conf/webpack.prod.js 文件

   ```diff
   const { merge } = require('webpack-merge')
   const commonConfig = require('./webpack.common.js')
   +const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
   
   module.exports = merge(commonConfig, {
     mode: 'production',
     devtool: 'cheap-module-source-map',
     target: 'browserslist',
   + plugins: [
   +   new BundleAnalyzerPlugin()
   + ]
   })
   ```

3. 修改 package.json 文件

   ```diff
   {
     "scripts": {
   -   "analyze": "webpack --config build-code-splitting-conf/webpack.dev.js --profile --json > stats.json"
   +   "analyze": "webpack --config build-code-splitting-conf/webpack.prod.js"
     }
   }
   ```

4. 运行 `npm run analyze` ，会看到自动打开浏览器访问 http://127.0.0.1:8888/

   ![webpack-bundle-analyzer 分析 bundle](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/webpack-bundle-analyzer%20%E5%88%86%E6%9E%90%20bundle.png)



#### prefech & preload

- preload 会在父 chunk 加载时，以并行方式开始加载；prefetch 会在父 chunk 加载结束后开始加载
- preload 具有中等优先级，并立即下载；prefetch 在浏览器闲置时下载
- preload 会在父 chunk 中立即请求，用于当下时刻；prefetch 会用于未来的某个时刻

**prefetch**

1. 修改 src/index.js 文件

   ```diff
   function component() {
   - return import(/* webpackChunkName: 'lodash' */'lodash').then(({ default: _ }) => {
   + return import(/* webpackPrefetch: true */'lodash').then(({ default: _ }) => {
       const elem = document.createElement('div')
       elem.innerHTML = _.join(['lodash', 'join'], ',')
       return elem
     })
   }
   ```

2. 运行 `npm run build:dev` ，打开浏览器访问 dist/index.html

   ![prefetch](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/prefetch.gif)



### CSS 文件的代码分割

#### output 的 filename 和 chunkFilename 区别

1. filename 是入口文件的命名
2. chunkFilename 是间接引入的模块的命名

1. 修改 src/index.js 文件

   ```js
   import Icon from './Lynk&Co.jpg'
   import style from './style.scss'
   // import printMe from './print.js'
   // import { add } from './math.js'
   // import _ from 'lodash'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
     elem.classList.add(style.hello)
   
     const myIcon = new Image()
     myIcon.src = Icon
     elem.appendChild(myIcon)
   
     return elem
   }
   
   document.body.appendChild(component())
   
   // if (module.hot) {
   //   module.hot.accept('./print.js', () => {
   //     console.log('Accepting the updated printMe module!')
   //     printMe()
   //   })
   // }
   
   // ['babel-loader', '@babel/core', '@babel/preset-env'].map(item => `npm i ${item} -D`)
   // Promise.resolve('@babel/polyfill').then(data => data)
   
   // console.log(add(1, 2))
   
   // console.log(_.join(['Code', 'Splitting'], ' '))
   
   // function component() {
   //   return import(/* webpackPrefetch: true */'lodash').then(({ default: _ }) => {
   //     const elem = document.createElement('div')
   //     elem.innerHTML = _.join(['lodash', 'join'], ',')
   //     return elem
   //   })
   // }
   
   // document.addEventListener('click', () => {
   //   component().then(elem => {
   //     document.body.appendChild(elem)
   //   })
   // })
   ```

2. 安装 mini-css-extract-plugin ，运行 `npm i mini-css-extract-plugin -D`

3. 修改 build-code-splitting-conf/webpack.prod.js 文件

   ```diff
   const { merge } = require('webpack-merge')
   const commonConfig = require('./webpack.common.js')
   -const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
   +const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   
   module.exports = merge(commonConfig, {
     mode: 'production',
     devtool: 'cheap-module-source-map',
     target: 'browserslist',
   + module: {
   +   rules: [
   +     {
   +       test: /\.(png|svg|jpg|gif)$/,
   +       use: {
   +         loader: 'url-loader',
   +         options: {
   +           name: '[name]_[hash].[ext]',
   +           outputPath: 'images/',
   +           limit: 20480 // 小于 20kb 以 base64 形式打包到 JS 文件中，否则打包到 images 文件夹下
   +         }
   +       }
   +     },
   +     {
   +       test: /\.css$/,
   +       use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // 逆序执行
   +     },
   +     {
   +       test: /\.s[ac]ss$/,
   +       use: [
   +         MiniCssExtractPlugin.loader,
   +         {
   +           loader: 'css-loader',
   +           options: {
   +             importLoaders: 2, // 经过测试，importLoaders 没有效果
   +             // 0 => no loaders (default)
   +             // 1 => postcss-loader
   +             // 2 => postcss-loader, sass-loader
   +             modules: true
   +           }
   +         },
   +         'postcss-loader',
   +         'sass-loader'
   +       ]
   +     },
   +     {
   +       test: /\.js$/,
   +       exclude: /node_modules/,
   +       use: ['babel-loader']
   +     }
   +   ]
   + },
     plugins: [
   -   new BundleAnalyzerPlugin()
   +   new MiniCssExtractPlugin()
     ]
   })
   ```

4. 修改 build-code-splitting-conf/webpack.dev.js 文件

   ```diff
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
   + module: {
   +   rules: [
   +     {
   +       test: /\.(png|svg|jpg|gif)$/,
   +       use: {
   +         loader: 'url-loader',
   +         options: {
   +           name: '[name]_[hash].[ext]',
   +           outputPath: 'images/',
   +           limit: 20480 // 小于 20kb 以 base64 形式打包到 JS 文件中，否则打包到 images 文件夹下
   +         }
   +       }
   +     },
   +     {
   +       test: /\.css$/,
   +       use: ['style-loader', 'css-loader', 'postcss-loader'] // 逆序执行
   +     },
   +     {
   +       test: /\.s[ac]ss$/,
   +       use: [
   +         'style-loader',
   +         {
   +           loader: 'css-loader',
   +           options: {
   +             importLoaders: 2, // 经过测试，importLoaders 没有效果
   +             // 0 => no loaders (default)
   +             // 1 => postcss-loader
   +             // 2 => postcss-loader, sass-loader
   +             modules: true
   +           }
   +         },
   +         'postcss-loader',
   +         'sass-loader'
   +       ]
   +     },
   +     {
   +       test: /\.js$/,
   +       exclude: /node_modules/,
   +       use: ['babel-loader']
   +     }
   +   ]
   + },
     plugins: [
       new webpack.HotModuleReplacementPlugin()
     ],
     optimization: {
       usedExports: true
     }
   })
   ```

5. 修改 build-code-splitting-conf/webpack.common.js 文件

   ```diff
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
   - module: {
   -   rules: [
   -     {
   -       test: /\.(png|svg|jpg|gif)$/,
   -       use: {
   -         loader: 'url-loader',
   -         options: {
   -           name: '[name]_[hash].[ext]',
   -           outputPath: 'images/',
   -           limit: 20480 // 小于 20kb 以 base64 形式打包到 JS 文件中，否则打包到 images 文件夹下
   -         }
   -       }
   -     },
   -     {
   -       test: /\.css$/,
   -       use: ['style-loader', 'css-loader', 'postcss-loader'] // 逆序执行
   -     },
   -     {
   -       test: /\.s[ac]ss$/,
   -       use: [
   -         'style-loader',
   -         {
   -           loader: 'css-loader',
   -           options: {
   -             importLoaders: 2, // 经过测试，importLoaders 没有效果
   -             // 0 => no loaders (default)
   -             // 1 => postcss-loader
   -             // 2 => postcss-loader, sass-loader
   -             modules: true
   -           }
   -         },
   -         'postcss-loader',
   -         'sass-loader'
   -       ]
   -     },
   -     {
   -       test: /\.js$/,
   -       exclude: /node_modules/,
   -       use: ['babel-loader']
   -     }
   -   ]
   - },
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
   ```

6. 修改 package.json 文件

   ```diff
   {
   - "build": "webpack --config build-tree-shaking-conf/webpack.prod.js",
   + "build": "webpack --config build-code-splitting-conf/webpack.prod.js",
   }
   ```

7. 运行 `npm run build` ，会看到 dist 文件夹下生成 main.css 文件

   ![Code Splitting CSS](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20CSS.png)

8. 取消 CSS Modules ，修改build-code-splitting-conf/webpack.prod.js 文件

   ```diff
   module.exports = merge(commonConfig, {
     mode: 'production',
     devtool: 'cheap-module-source-map',
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
   -             modules: true
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
       new MiniCssExtractPlugin()
     ]
   })
   ```

9. 修改 src/index.js 文件

   ```diff
   import Icon from './Lynk&Co.jpg'
   -import style from './style.scss'
   +import './style.scss'
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
   - elem.classList.add(style.hello)
   + elem.classList.add('hello')
   
     const myIcon = new Image()
     myIcon.src = Icon
     elem.appendChild(myIcon)
   
     return elem
   }
   
   document.body.appendChild(component())
   ```

10. 修改 package.json 文件

    ```diff
    {
    - "sideEffects": false,
    }
    ```

11. 运行 `npm run build` ，会看到 dist 文件夹下生成 main.css 文件

    ![Code Splitting CSS](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20CSS.png)

12. 修改 build-code-splitting-conf/webpack.prod.js 文件

    ```diff
    module.exports = merge(commonConfig, {
      plugins: [
    -   new MiniCssExtractPlugin()
    +   new MiniCssExtractPlugin({
    +     filename: '[name].[contenthash:8].css'
    +   })
      ]
    })
    ```

13. 运行 `npm run build` ，会看到 dist 文件夹下生成 main.9ae6907e.css

    ![Code Splitting CSS 自定义 filename](https://raw.githubusercontent.com/negrochn/study-imooc/master/316/img/Code%20Splitting%20CSS%20%E8%87%AA%E5%AE%9A%E4%B9%89%20filename.png)

14. 安装 optimize-css-assets-webpack-plugin ，运行 `npm i optimize-css-assets-webpack-plugin -D`

15. 修改 build-code-splitting-conf/webpack.prod.js 文件

    ```diff
    +const OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
    
    module.exports = merge(commonConfig, {
    + optimization: {
    +   minimizer: [new OptimizationCssAssetsPlugin()]
    + }
    })
    ```

16. 运行 `npm run build` ，会看到 dist 文件夹下生成 main.9ae6907e.css

