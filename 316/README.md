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

1. 修改 build-base-conf/package.json 文件

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
   +   "watch": "webpack --watch"
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

5. 修改 str/style.scss 文件，会看到 Hello webpack 字体从红色变为绿色

   ```diff
   -$body-color: red;
   +$body-color: green;
   
   .hello {
     color: $body-color;
     transform: translate(100px, 100px);
   }
   ```

   ![Hot Module Replacement CSS]()



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

   ![Hot Module Replacement JS]()

对于 JS ，额外使用 `module.hot.accept` 监控变动的文件，并在回调中处理变化后需要做的事；对于 CSS ，style-loader 内置了 `module.hot.accpet` ，不需要额外处理。



