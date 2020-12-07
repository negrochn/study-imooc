# Node.js 从零开发 Web Server 博客项目

## Node.js 介绍

Node.js ，一个 JS 的运行环境。



### 用途

1. **运行在服务端，作为 Web Server**
2. 运行在本地，作为打包、构建工具



### nvm

Node.js 版本管理工具，可切换多个 Node.js 版本。

#### 下载地址

https://github.com/coreybutler/nvm-windows/releases

#### 使用

- `nvm list` ，查看当前所有的 Node 版本
- `nvm install 15.3.0` ，安装指定的版本
- `nvm use 15.3.0` ，切换到指定的版本
- `nvm uninstall 15.3.0` 卸载指定的版本



### Node.js 和 JS 的区别

- ECMAScript 是语法规范
- **Node.js = ECMAScript + Node.js API**
- JS = ECMAScript + Web API



### debugger

1. VS Code 自带的 debugger
2. inspect 协议（设置 `--inspect=9229` ，访问 chrome://inspect）



### 服务端和前端的区别

1. 服务稳定性
2. 考虑内存和 CPU（优化、扩展）
3. 日志记录
4. 安全
5. 集群和服务拆分

#### 服务稳定性

- 服务端可能会遭受各种恶意攻击和误操作
- 单个客户端可以意外挂掉，但是服务端不能
- **使用 PM2 做进程守护**

#### 考虑内存和 CPU（优化、扩展）

- 前端独占一个浏览器，内存和 CPU 都不是问题
- 服务端要承载很多请求，内存和 CPU 都是稀缺资源
- **使用 stream 写日志（优化），使用 redis 存 session（扩展）**

#### 日志记录

- 前端也会参与写日志，但只是日志的发起方，不关心后续
- 服务端要记录日志、存储日志、分析日志，前端不关心
- **使用多种日志记录方式，以及如何分析日志**

#### 安全

- 服务端要随时准备接收各种恶意攻击，前端则少很多，如越权操作、数据库攻击等
- **登录验证，预防 xss 攻击和 sql 注入**

#### 集群和服务拆分

- 产品发展速度快，流量可能会迅速增加，通过扩展机器和服务拆分来承载大流量
- **从设计上支持服务拆分**



## 项目介绍

### 目标

- 开发一个博客系统，具有博客的基本功能
- 只开发服务端，不关心前端



### 需求

- [首页](https://img.mukewang.com/szimg/5c87a0690001899e19201080.jpg)、[作者页](https://img.mukewang.com/szimg/5c87a0740001aa6f19201080.jpg)、[博客详情页](https://img.mukewang.com/szimg/5c87a0870001ab1d19201080.jpg)
- [登录页](https://img.mukewang.com/szimg/5c87a0940001542019201080.jpg)
- [管理中心](https://img.mukewang.com/szimg/5c87a0ab000102e119201080.jpg)，[新建页、编辑页](https://img.mukewang.com/szimg/5c87a0cc0001440f19201080.jpg)



### 技术方案

- 数据存储
  - [博客](https://img1.sycdn.imooc.com/szimg/5c87a4480001ca9319201080.jpg)
  - [用户](https://img1.sycdn.imooc.com/szimg/5c87a45c0001f58119201080.jpg)
- [接口设计](https://img1.sycdn.imooc.com/szimg/5c87a46900014d6419201080.jpg)



## 博客项目之接口

### http 概述

1. DNS 解析，建立 TCP 连接，发送 http 请求
2. 服务端接收到 http 请求，处理并返回数据
3. 客户端接收到返回数据，处理数据，如渲染页面、执行 JS 等



[从输入 URL 到页面加载完成，发生了什么？](https://user-gold-cdn.xitu.io/2018/10/18/16685737b823244c?imageslim)

[三次握手](https://user-gold-cdn.xitu.io/2019/8/30/16ce0862026cea13?imageslim)

[四次挥手](https://user-gold-cdn.xitu.io/2019/8/30/16ce08696d48c3ba?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### get 请求

```js
const http = require('http')
// 用于解析和格式化 URL 查询字符串
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log(req.method) // GET
  const url = req.url
  // 将 URL 查询字符串解析为键值对的集合
  req.query = querystring.parse(url.split('?')[1])
  res.end(JSON.stringify(req.query))
})

server.listen(8000)
```



### post 请求

```js
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // 数据格式，注意 req.headers 中的键都是小写。
    console.log('Content-Type: ', req.headers['content-type'])
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log(postData)
      res.end('Hello Node.js!')
    })
  }
})

server.listen(8000)
```

#### 使用 Postman

下载并安装 [Postman](https://www.postman.com/downloads/) ，按如下步骤使用 Postman 。

![使用 Postman](https://raw.githubusercontent.com/negrochn/study-imooc/master/320/img/%E4%BD%BF%E7%94%A8%20Postman.jpg)



### 综合示例

```js
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const { method, url } = req
  const [path, params] = url.split('?')
  const query = querystring.parse(params)
  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }
  // 设置返回数据格式为 JSON ，注意 setHeader 方法的第一个参数的大小写
  res.setHeader('Content-Type', 'application/json')
  
  if (method === 'GET') {
    // end 返回的仍然是字符串格式，但是 JSON 格式的字符串
    res.end(JSON.stringify(resData))
  }
  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = JSON.parse(postData)
      res.end(JSON.stringify(resData))
    })
  }
})

server.listen(8000)
```



### 搭建开发环境

- 不使用任何框架
- **使用 nodemon 监测文件变化**，自动重启 Node
- **使用 cross-env 设置环境变量**，兼容 Mac 、Linux 和 Windows

#### 步骤

1. 初始化项目，创建并进入 blog 文件夹，执行 `npm init -y`

2. 创建 app.js 和 www/bin.js 文件

   ```js
   // app.js
   
   const handleServer = (req, res) => {
     // 设置返回数据格式为 JSON
     res.setHeader('Content-Type', 'application/json')
   
     const resData = {
       name: 'negrochn',
       age: 18,
       env: process.env.NODE_ENV
     }
   
     res.end(JSON.stringify(resData))
   }
   
   module.exports = handleServer
   ```

   ```js
   // bin/www.js
   
   const http = require('http')
   const handleServer = require('../app')
   const PORT = 8000
   
   const server = http.createServer(handleServer)
   
   server.listen(PORT)
   ```

3. 安装 nodemon 和 cross-env ，执行 `npm i nodemon cross-env -D --registry=https://registry.npm.taobao.org`

4. 修改 package.json

   ```json
   {
     "scripts": {
       "dev": "cross-env NODE_ENV=dev nodemon bin/www.js"
     }
   }
   ```

5. 启动 Node 服务，执行 `npm run dev`

6. 测试服务是否正常，通过浏览器或 Postman 访问 http://localhost:8000



### 初始化路由

#### 步骤

1. 创建并进入 src 文件夹，创建并进入 router 文件夹，创建 blog.js 和 user.js 文件

   ```js
   // src/router/blog.js
   
   const handleBlogRouter = (req, res) => {
     const { method, path } = req
   
     // 获取博客列表
     if (method === 'GET' && path === '/api/blog/list') {
       return {
         msg: '这是获取博客列表的接口'
       }
     }
     // 获取博客详情
     if (method === 'GET' && path === '/api/blog/detail') {
       return {
         msg: '这是获取博客详情的接口'
       }
     }
     // 新增博客
     if (method === 'POST' && path === '/api/blog/new') {
       return {
         msg: '这是新增博客的接口'
       }
     }
     // 更新博客
     if (method === 'POST' && path === '/api/blog/update') {
       return {
         msg: '这是更新博客的接口'
       }
     }
     // 删除博客
     if (method === 'POST' && path === '/api/blog/del') {
       return {
         msg: '这是删除博客的接口'
       }
     }
   }
   
   module.exports = handleBlogRouter
   ```

   ```js
   // src/router/user.js
   
   const handleUserRouter = (req, res) => {
     const { method, path } = req
   
     // 登录
     if (method === 'POST' && path === '/api/user/login') {
       return {
         msg: '这是登录的接口'
       }
     }
   }
   
   module.exports = handleUserRouter
   ```

2. 修改 app.js

   ```js
   // app.js
   
   const handleBlogRouter = (req, res) => {
     const { method, path } = req
   
     // 获取博客列表
     if (method === 'GET' && path === '/api/blog/list') {
       return {
         msg: '这是获取博客列表的接口'
       }
     }
     // 获取博客详情
     if (method === 'GET' && path === '/api/blog/detail') {
       return {
         msg: '这是获取博客详情的接口'
       }
     }
     // 新增博客
     if (method === 'POST' && path === '/api/blog/new') {
       return {
         msg: '这是新增博客的接口'
       }
     }
     // 更新博客
     if (method === 'POST' && path === '/api/blog/update') {
       return {
         msg: '这是更新博客的接口'
       }
     }
     // 删除博客
     if (method === 'POST' && path === '/api/blog/del') {
       return {
         msg: '这是删除博客的接口'
       }
     }
   }
   
   module.exports = handleBlogRouter
   ```

3. 启动 Node 服务，执行 `npm run serve`

4. Postman 导入 blog.postman_collection.json ，分别测试获取博客列表、获取一篇博客的内容、新增一篇博客、更新一篇博客、删除一篇博客和登录接口

   ![Postman 导入 JSON](https://raw.githubusercontent.com/negrochn/study-imooc/master/320/img/Postman%20%E5%AF%BC%E5%85%A5%20JSON.gif)



### 开发路由

#### 博客列表

1. 进入 src 文件夹，创建并进入 model 文件夹，创建 resModel.js 文件

   ```js
   // src/model/resModel.js
   
   class BaseModel {
     constructor(data, message) {
       if (typeof data === 'string') {
         this.message = data
         data = null
         message = null
       }
       if (data) {
         this.data = data
       }
       if (message) {
         this.message = message
       }
     }
   }
   
   class SuccessModel extends BaseModel {
     constructor(data, message) {
       super(data, message)
       this.errno = 0
     }
   }
   
   class ErrorModel extends BaseModel {
     constructor(data, message) {
       super(data, message)
       this.errno = -1
     }
   }
   
   module.exports = {
     SuccessModel,
     ErrorModel
   }
   ```

2. 进入 src 文件夹，创建并进入 controller 文件夹，创建 blog.js 文件

   ```js
   // src/controller/blog.js
   
   const getList = (author, keyword) => {
     return [
       {
         id: 1,
         title: 'Node.js从零开发Web Server博客项目 前端晋升全栈工程师必备',
         content: '前端开发人员必备技能Node.js提升课程。本课程以博客项目为主线，由浅入深讲解 Node.js 基础知识、框架和插件原理、web Server 的特点与必备模块；同时运用 Node.js 原生和常用框架 Express、Koa2框架三种方式开发web Server，在项目开发过程中全面掌握Node.js。掌握全栈工程师必备技能，为你带来开发和求职的双重收获！',
         createTime: '1607305440732',
         author: 'negrochn'
       },
       {
         id: 2,
         title: '从基础到实战 手把手带你掌握新版Webpack4.0',
         content: 'Webpack 目前无论在求职还是工作中，使用越来越普及。而想要学懂，学会Webpack更绝非易事。本课程完整讲清最新版本下的 Webpack 4 知识体系，通过 基础 + 实例 + 原理代码编写 + 复杂案例分析 完成Webpack4的分析与讲解。更重要的是让你对整个前端项目的构建有一个全局化的认识，实现能力思想双升级。',
         createTime: '1607305511915',
         author: 'lexiaodai'
       }
     ]
   }
   
   module.exports = {
     getList
   }
   ```

3. 修改 app.js 文件

   ```js
   // app.js
   const querystring = require('querystring')
   
   const handleServer = (req, res) => {
     // 获取 path
     const [path, query] = req.url.split('?')
     req.path = path
   
     // 解析 query
     req.query = querystring.parse(query)
   }
   ```

4. 修改 src/router/blog.js 文件

   ```js
   // src/router/blog.js
   
   const { getList } = require('../controller/blog')
   const { SuccessModel, ErrorModel } = require('../model/resModel')
   
   const handleBlogRouter = (req, res) => {
     // 获取博客列表
     if (method === 'GET' && path === '/api/blog/list') {
       const { author, keyword } = req.query
       return new SuccessModel(getList(author, keyword))
     }
   }
   ```

5. 启动 Node 服务后，通过 Postman 测试获取博客列表接口

   ![返回结果](https://raw.githubusercontent.com/negrochn/study-imooc/master/320/img/Postman%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C.png)



#### 博客详情

1. 修改 src/controller/blog.js 文件

   ```js
   // src/controller/blog.js
   
   const getDetail = (id) => {
     return {
       id: 1,
       title: 'Node.js从零开发Web Server博客项目 前端晋升全栈工程师必备',
       content: '前端开发人员必备技能Node.js提升课程。本课程以博客项目为主线，由浅入深讲解 Node.js 基础知识、框架和插件原理、web Server 的特点与必备模块；同时运用 Node.js 原生和常用框架 Express、Koa2框架三种方式开发web Server，在项目开发过程中全面掌握Node.js。掌握全栈工程师必备技能，为你带来开发和求职的双重收获！',
       createTime: '1607305440732',
       author: 'negrochn'
     }
   }
   
   module.exports = {
     getDetail
   }
   ```

2. 修改 src/router/blog.js 文件

   ```js
   // src/router/blog.js
   
   const { getDetail } = require('../controller/blog')
   
   const handleBlogRouter = (req, res) => {
     // 获取博客详情
     if (method === 'GET' && path === '/api/blog/detail') {
       const { id } = req.query
       return new SuccessModel(getDetail(id))
     }
   }
   ```



#### 处理 post data

修改 app.js 文件

```js
// app.js

// 用于处理 post data
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const handleServer = (req, res) => {
  // 处理 post data
  getPostData(req).then(postData => {
    req.body = postData

    // 处理 blog 路由

    // 处理 user 路由

    // 未命中路由返回 404

  })
}
```



#### 新建博客

1. 修改 src/controller/blog.js 文件

   ```js
   // src/controller/blog.js
   
   const addBlog = (blogData = {}) => {
     return {
       id: 3
     }
   }
   
   module.exports = {
     addBlog
   }
   ```

2. 修改 src/router/blog.js 文件

   ```js
   // src/router/blog.js
   
   const { addBlog } = require('../controller/blog')
   
   const handleBlogRouter = (req, res) => {
     // 新增博客
     if (method === 'POST' && path === '/api/blog/new') {
       return new SuccessModel(addBlog(req.body))
     }
   }
   ```



#### 更新博客

1. 修改 src/controller/blog.js 文件

   ```js
   // src/controller/blog.js
   
   const updateBlog = (id, blogData = {}) => {
     return true
   }
   
   module.exports = {
     updateBlog
   }
   ```

2. 修改 src/router/blog.js 文件

   ```js
   // src/router/blog.js
   
   const { updateBlog } = require('../controller/blog')
   
   const handleBlogRouter = (req, res) => {
     // 将获取 id 操作挪到上面
     const { id } = req.query
     
     // 更新博客
     if (method === 'POST' && path === '/api/blog/update') {
       return new SuccessModel(updateBlog(id, req.body))
     }
   }
   ```



#### 删除博客

1. 修改 src/controller/blog.js 文件

   ```js
   // src/controller/blog.js
   
   const delBlog = (id) => {
     return true
   }
   
   module.exports = {
     delBlog
   }
   ```

2. 修改 src/router/blog.js 文件

   ```js
   // src/router/blog.js
   
   const { delBlog } = require('../controller/blog')
   
   const handleBlogRouter = (req, res) => {
     // 删除博客
     if (method === 'POST' && path === '/api/blog/del') {
       const result = delBlog(id)
       if (result) {
         return new SuccessModel()
       } else {
         return new ErrorModel('删除博客失败')
       }
     }
   }
   ```



#### 登录

1. 进入 src/controller 文件夹，创建 user.js 文件

   ```js
   // src/controller/user.js
   
   const login = (username, password) => {
     if (username === 'negrochn' && password === '123') {
       return true
     }
     return false
   }
   
   module.exports = {
     login
   }
   ```

2. 修改 src/router/user.js 文件

   ```js
   // src/router/user.js
   
   const { login } = require('../controller/user')
   const { SuccessModel, ErrorModel } = require('../model/resModel')
   
   const handleUserRouter = (req, res) => {
     // 登录
     if (method === 'POST' && path === '/api/user/login') {
       const { username, password } = req.body
       const result = login(username, password)
       if (result) {
         return new SuccessModel()
       } else {
         return new ErrorModel('登录失败')
       }
     }
   }
   ```

   