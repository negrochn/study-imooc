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



