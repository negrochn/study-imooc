# 从基础到实战 手把手带你掌握新版 webpack

## 概念

webpack 是一个用于现代 JS 应用程序的静态模块打包工具（module bundler）。



>设置淘宝镜像
>
>1. 设置镜像，执行 `npm set registry http://registry.npm.taobao.org/`
>2. 查看镜像，执行 `npm get registry`



### 核心概念

#### entry

entry ，指定入口文件。

默认值，`./src/index.js` 。

```js
module.exports = {
  entry: './src/index.js',
}
```



#### output

output ，指定打包后文件的位置及文件名。

默认值，`./dist/main.js` 。

```js
const path = require('path')

module.exports = {
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```



#### loader

webpack 只能理解 JS 和 JSON 文件，loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用功能，以及被添加到依赖图中。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}
```



#### plugin

loader 用于转换某些类型的模块，而 plugin 则可以用于执行范围更广的任务，包括打包优化、资源管理、注入环境变量。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
```



#### mode

mode ，启用 webpack 内置在相应环境下的优化。

选项，development 、production 和 none 。

默认值，production 。

```js
module.exports = {
  mode: 'production'
}
```



## 安装

### 搭建 webpack 环境

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

6. 修改 package.json 文件，确保我们安装包是私有的，并移除 main 入口，防止意外发布代码

   ```diff
   {
   - "main": "index.js",
   + "private": true,
   }
   ```

7. 执行 `npx webpack` ，生成 dist/main.js 文件

8. 复制 index.html 到 dist 文件夹，并修改 dist/index.html 文件

   ```diff
   - <script src="./src/index.js"></script>
   + <script src="./main.js"></script>
   ```

9. 在浏览器中打开 dist/index.html ，看到 `Hello webpack`



> `npx webpack -v` ，查看项目 webpack 版本。



### 使用配置文件

1. 创建 webpack.config.js 文件

   ```js
   // webpack.config.js
   
   const path = require('path')
   
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'main.js',
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

3. 执行 `npm run build` ，代替之前的 `npx webpack`



> `npx webpack --config webpack.config.js` ，指定配置文件打包。

