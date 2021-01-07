# 从基础到实战 手把手带你掌握新版 webpack5

## webpack

webpack 是一个用于现代 JS 应用程序的静态模块打包工具（module bundler）。



**设置淘宝镜像**

1. 设置镜像，执行 `npm set registry http://registry.npm.taobao.org/`
2. 查看镜像，执行 `npm get registry`



### 安装

#### 搭建环境

1. 创建并进入 webpack 文件夹

2. 初始化项目，执行 `npm init -y`

3. 安装 webpack 和 webpack-cli ，执行 `npm i webpack webpack-cli -D`

4. 创建并进入 src 文件夹，创建 index.js

   ```js
   // src/index.js
   
   function component() {
     const elem = document.createElement('div')
     elem.innerHTML = ['Hello', 'webpack'].join(' ')
     return elem
   }
   
   document.body.appendChild(component())
   ```

5. 创建 index.html 文件

   ```html
   <!-- index.html -->
   
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

7. 执行 `npx webpack` ，生成 dist/main.js 文件

8. 复制 index.html 到 dist 文件夹，并修改 dist/index.html 文件

   ```diff
   - <script src="./src/index.js"></script>
   + <script src="./bundle.js"></script>
   ```

9. 在浏览器中打开 dist/index.html ，看到 `Hello webpack`



#### 配置文件

1. 创建 webpack.config.js 文件

   ```js
   // webpack.config.js
   
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

3. 执行 `npm run build` ，生成 dist/bundle.js 文件



## loader

### 样式篇

1. 安装 style-loader 、css-loader 、postcss-loader ，执行 `npm i style-loader css-loader postcss-loader -D`

2. 安装 autoprefixer ，执行 `npm i autoprefixer -D`

3. 安装 sass-loader 和 node-sass ，执行 `npm i sass-loader node-sass -D`

4. 修改 webpack.config.js 文件

   ```js
   // webpack.config.js
   
   const path = require('path')
   
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
   // postcss.config.js
   
   module.exports = {
     plugins: [
       require('autoprefixer')
     ]
   }
   ```

6. 修改 package.json 文件

   ```json
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
   /* src/style.scss */
   
   $body-color: red;
   
   .hello {
     color: $body-color;
     transform: translate(100px, 100px);
   }
   ```

8. 修改 src/index.js 文件

   ```diff
   // src/index.js
   
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

9. 执行 `npm run build`

10. 在浏览器中打开 dist/index.html ，看到红色字体的 `Hello webpack`

11. 查看页面的 \<head\> 标签，包含 style 块元素，且包含厂商前缀



### 图片篇

url-loader 功能类似于 file-loader ，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL 。



1. 安装 url-loader ，执行 `npm i url-loader -D`

2. 修改 webpack.config.js 文件

   ```js
   // webpack.config.js
   
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
   // src/index.js
   
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

4. 执行 `npm run build`

5. 在浏览器中打开 dist/index.html ，看到能够显示图片



## plugin

plugin 可以在 webpack 运行到某个时刻时，帮我们做一些事情。



### html-webpack-plugin

html-webpack-plugin 会在打包结束后，自动生成一个 HTML 文件，并把打包生成的 JS 自动引入到这个 HTML 文件中。



1. 安装 html-webpack-plugin ，执行 `npm i html-webpack-plugin -D`

2. 修改 webpack.config.js 文件

   ```js
   // webpack.config.js
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     plugins: [
       new HtmlWebpackPlugin({
         template: 'index.html'
       })
     ]
   }
   ```

3. 删除 dist 文件夹，执行 `npm run build` ，查看到 dist 文件夹下自动生成了 index.html 文件



### clean-webpack-plugin

1. 安装 clean-webpack-plugin ，执行 `npm i clean-webpack-plugin -D`

2. 修改 webpack.config.js 文件

   ```js
   // webpack.config.js
   
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   
   module.exports = {
     plugins: [
       new CleanWebpackPlugin()
     ]
   }
   ```

3. 执行 `npm run build` ，会自动删除 dist 文件夹下的文件



## entry & output

1. 修改 webpack.config.js 文件

   ```js
   // webpack.config.js
   
   module.exports = {
     entry: {
       main: './src/index.js'
     },
     output: {
       // publicPath: 'https://www.negro.chn/', // 如果项目中的静态资源上传到 CDN ，可以通过配置 publicPath 添加前缀
       filename: '[name].js',
       path: path.resolve(__dirname, 'dist')
     },
   }
   ```

2. 执行 `npm run build` ，发现 dist 文件夹下生成 main.js 文件，与 entry 中的 main 对应



## SourceMap

### 五个关键字

- **inline**

  将 .map 作为 DataURI 嵌入，不单独生成 .map 文件

- **eval**

  使用 eval 包裹模块代码

- **cheap**

  不包含列信息，也不包含 loader 的 SourceMap

- **module**

  包含 loader 的SourceMap

- **source-map**

  产生 .map 文件



### eval 和 source-map 的关系

1. eval 和 source-map 都是 devtool 的配置项

2. eval 将 webpack 中每个模块包裹，然后在模块末尾添加 //# sourceURL ，依靠 sourceURL 找到原始代码的位置

   ![eval]()

3. 包含 source-map 关键字的配置项都会产生一个 .map 文件，该文件保存有原始代码与运行代码的映射关系，浏览器可以通过它找到原始代码的位置

4. 包含 inline 关键字的配置项也会产生 .map 文件，但是该文件是经过 base64 编码作为 DataURI 嵌入

   ![inline-source-map]()

5. eval-source-map 是 eval 和 source-map 的组合，使用 eval 语句包裹模块，也产生了 .map 文件，该文件作为 DataURI 替换 eval 模式中末尾的 //# sourceURL

   ![eval-source-map]()



### cheap 关键字的含义

1. 包含 cheap 关键字，则产生的 .map 文件不包含列信息，即光标只定位到行数，不定位到具体字符位置

   ![cheap-source-map 光标]()

2. 不包含 cheap 关键字，将定位到字符位置

   ![eval 光标]()



### devtool 最佳实践

1. development 模式，`devtool: eval-cheap-module-source-map`
2. production 模式，省略 devtool 或者`devtool: cheap-module-source-map`