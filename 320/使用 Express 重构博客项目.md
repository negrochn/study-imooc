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

