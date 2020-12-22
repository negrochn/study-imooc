# 使用 Express 重构博客项目

## Express

Express 是 Node.js 最常用的 Web Server 框架。



### 安装

全局安装 express-generator ，执行 `npm i express-generator -g --registry=https://registry.npm.taobao.org` 。



## Express 开发博客项目

### 搭建开发环境

#### 步骤

1. 初始化项目，执行 `express blog-express`

2. 进入 blog-express 文件夹，执行 `cd blog-express` 

3. 安装 npm 依赖，执行 `npm i --registry=https://registry.npm.taobao.org`

4. 安装 nodemon 和 cross-env ，执行 `npm i nodemon cross-env -D --registry=https://registry.npm.taobao.org`

5. 修改 package.json 文件

   ```json
   {
     "scripts": {
       "dev": "cross-env NODE_ENV=dev nodemon ./bin/www"
     },
   }
   ```

6. 修改 app.js 文件

   ```js
   // error handler
   app.use(function(err, req, res, next) {
     res.locals.error = req.app.get('env') === 'dev' ? err : {};
   }
   ```

7. 启动服务，执行 `npm run dev`

8. 测试服务是否正常，通过浏览器访问 http://localhost:3000/



### 初始化环境

#### 步骤

1. 删除 blog-express 项目中不相关的代码

2. 安装 mysql 和 xss ，执行 `npm i mysql xss --save --registry=https://registry.npm.taobao.org`

3. 复用 blog 项目的代码，复制 conf 文件夹、controller 文件夹、db 文件夹、model 文件夹和 utils/crypto.js 文件

4. 进入 routes 文件夹，创建 blog.js 文件

   ```js
   // routes/blog.js
   
   const express = require('express')
   const router = express.Router()
   
   const { getList } = require('../controller/blog')
   const { SuccessModel, ErrorModel } = require('../model/resModel')
   
   router.get('/list', (req, res, next) => {
     let { author, keyword, isadmin } = req.query
     
     return getList(author, keyword).then(data => res.json(new SuccessModel(data)))
   })
   
   module.exports = router
   ```

5. 进入 routes 文件夹，创建 user.js 文件

   ```js
   // routes/user.js
   
   const express = require('express')
   const router = express.Router()
   
   module.exports = router
   ```

6. 修改 app.js 文件

   ```js
   // app.js
   
   const blogRouter = require('./routes/blog')
   const userRouter = require('./routes/user')
   
   // 在 app.use(cookieParser()); 之后
   app.use('/api/blog', blogRouter)
   app.use('/api/user', userRouter)
   ```

7. 启动服务，执行 `npm run dev` ，通过 Postman 访问获取博客列表接口（端口号改为 3000）



