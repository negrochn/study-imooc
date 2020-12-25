# 使用 Koa2 重构博客项目

## Koa2

Express 中间件是异步回调，Koa2 原生支持 async/await 。



### async/await

1. await 后面可以追加 Promise 对象，获取 resolve 的值
2. await 必须包裹在 async 函数里面
3. async 函数执行返回的也是一个 Promise 对象
4. try...catch 截获 Promise 中 reject 的值



### 安装

全局安装 koa-generator ，执行 `npm i koa-generator -g --registry=https://registry.npm.taobao.org` 。



## Koa2 开发博客项目

### 搭建开发环境

1. 初始化项目，执行 `koa2 blog-koa2`

2. 进入 blog-koa2 文件夹，执行 `cd blog-koa2`

3. 安装 npm 依赖，执行 `npm i --registry=https://registry.npm.taobao.org`

4. 安装 cross-env ，执行 `npm i cross-env -D --registry=https://registry.npm.taobao.org`

5. 修改 package.json 文件

   ```json
   {
     "scripts": {
       "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
       "prd": "cross-env NODE_ENV=production pm2 start bin/www",
     },
   }
   ```

6. 修改 bin/www 文件

   ```js
   // bin/www
   
   var port = normalizePort(process.env.PORT || '8000');
   ```

7. 启动服务，执行 `npm run dev`

8. 测试服务是否正常，通过浏览器访问 http://localhost:8000/



### 初始化环境

1. 删除 blog-koa2 项目中不相关的代码

2. 安装 mysql 和 xss ，执行 `npm i mysql xss --save --registry=https://registry.npm.taobao.org`

3. 复用 blog 项目的代码，复制 conf 文件夹、controller 文件夹、db 文件夹、model 文件夹和 utils/crypto.js 文件

4. 进入 routes 文件夹，创建 blog.js 文件

   ```js
   // routes/blog.js
   
   const router = require('koa-router')()
   const { getList } = require('../controller/blog')
   const { SuccessModel, ErrorModel } = require('../model/resModel')
   
   router.prefix('/api/blog')
   
   router.get('/list', async (ctx, next) => {
     let { author, keyword } = ctx.query
     
     const data = await getList(author, keyword)
     ctx.body = new SuccessModel(data)
   })
   
   module.exports = router
   ```

5. 进入 routes 文件夹，创建 user.js 文件

   ```js
   // routes/user.js
   
   const router = require('koa-router')()
   
   router.prefix('/api/user')
   
   module.exports = router
   ```

6. 修改 app.js 文件

   ```js
   // app.js
   
   const blogRouter = require('./routes/blog')
   const userRouter = require('./routes/user')
   
   // routes
   app.use(blogRouter.routes(), blogRouter.allowedMethods())
   app.use(userRouter.routes(), userRouter.allowedMethods())
   ```

7. 启动服务，执行 `npm run dev` ，通过 Postman 访问获取博客列表接口



### Session & Redis

1. 安装 koa-generic-session ，执行 `npm i koa-generic-session --save --registry=https://registry.npm.taobao.org`

2. 安装 koa-redis 和 redis ，执行 `npm i koa-redis redis --save --registry=https://registry.npm.taobao.org`

3. 修改 app.js 文件

   ```js
   // app.js
   
   const session = require('koa-generic-session')
   const redisStore = require('koa-redis')
   
   const { REDIS_CONF } = require('./conf/db')
   
   // session
   app.keys = ['Negrochn_1224']
   app.use(session({
     // 配置 cookie
     cookie: {
       path: '/',
       httpOnly: true,
       maxAge: 24 * 60 * 60 * 1000
     },
     // 配置 redis
     store: redisStore({
       host: REDIS_CONF.host,
       port: REDIS_CONF.port 
     })
   }))
   
   ```

4. 修改 routes/user.js 文件

   ```js
   // routes/user.js
   
   const { login } = require('../controller/user')
   const { SuccessModel, ErrorModel } = require('../model/resModel')
   
   router.post('/login', async (ctx, next) => {
     const { username, password } = ctx.request.body
     const data = await login(username, password)
     if (data) {
       // 设置 session
       ctx.session.username = data.username
       ctx.session.realname = data.realname
       // koa-generic-session 直接同步到 redis 中，不需要再 set(ctx.sessionId, ctx.session)
         // // 同步到 redis
         // set(ctx.sessionId, ctx.session)
       ctx.body = new SuccessModel()
     } else {
       ctx.body = new ErrorModel('登录失败')
     }
   })
   ```

5. 启动 Redis，启动 Node ，通过 Postman 访问登录接口，查看是否已经同步到 Redis



### 登录中间件

创建并进入 middleware 文件夹，创建 loginCheck.js 文件。

```js
// middleware/loginCheck.js

const { ErrorModel } = require('../model/resModel')

const loginCheck = async (ctx, next) => {
  if (ctx.session.username) {
    await next() // 此处必须使用 await ，否则访问接口时会显示 Not Found
    return
  }
  ctx.body = new ErrorModel('未登录')
}

module.exports = loginCheck
```



### 开发路由

#### 博客列表

1. 修改 routes/blog.js 文件

   ```js
   // routes/blog.js
   
   router.get('/list', async (ctx, next) => {
     let { author, keyword, isadmin } = ctx.query
     // 管理员界面
     if (isadmin) {
       // 未用到 loginCheck 中间件来判断，而是直接使用 req.session.username 来判断
       if (ctx.session.username == null) {
         ctx.body = new ErrorModel('尚未登录')
         return
       }
       // 强制查看自己的博客
       author = ctx.session.username
     }
     
     const data = await getList(author, keyword)
     ctx.body = new SuccessModel(data)
   })
   ```

2. 启动 Redis ，启动 Nginx ，启动 Node

3. 通过 Postman 测试获取博客列表接口

#### 博客详情

```js
// routes/blog.js
const { getDetail } = require('../controller/blog')

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data) 
})
```

#### 新建博客

```js
// routes/blog.js

const { addBlog } = require('../controller/blog')

const loginCheck = require('../middleware/loginCheck')

router.post('/new', loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username
  const data = await addBlog(ctx.request.body)
  ctx.body = new SuccessModel(data)
})
```

#### 更新博客

```js
// routes/blog.js

const { updateBlog } = require('../controller/blog')

router.post('/update', loginCheck, async (ctx, next) => {
  const data = await updateBlog(ctx.query.id, ctx.request.body)
  if (data) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})
```

#### 删除博客

```js
// routes/blog.js

const { delBlog } = require('../controller/blog')

router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const data = await delBlog(ctx.query.id, author)
  if (data) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})
```

#### 联调演示

1. 依次启动以下服务
   1. MySQL ，不需要手动启动
   2. Redis ，`redis-server`
   3. http-server ，`http-server -p 8001`
   4. Node ，`npm run dev`
   5. Nginx ，`start nginx`
2. 访问 http://localhost:8080/ ，测试博客项目的所有功能



