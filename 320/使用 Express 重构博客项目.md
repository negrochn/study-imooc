# 使用 Express 重构博客项目

## Express

Express 是 Node.js 最常用的 Web Server 框架。



### 安装

全局安装 express-generator ，执行 `npm i express-generator -g --registry=https://registry.npm.taobao.org` 。



## Express 开发博客项目

### 搭建开发环境

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

7. 修改 bin/www 文件

   ```js
   // bin/www
   
   var port = normalizePort(process.env.PORT || '8000');
   ```

8. 启动服务，执行 `npm run dev`

9. 测试服务是否正常，通过浏览器访问 http://localhost:8000/



### 初始化环境

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

7. 启动服务，执行 `npm run dev` ，通过 Postman 访问获取博客列表接口



### Session

1. 安装 express-session ，执行 `npm i express-session -save --registry=https://registry.npm.taobao.org`

2. 修改 app.js 文件

   ```js
   // app.js
   
   const session = require('express-session')
   
   // 在 app.use(cookieParser()); 之后
   app.use(session({
     secret: 'Negrochn_1222',
     cookie: {
       // path: '/', // 默认配置
       // httpOnly: true, // 默认配置
       maxAge: 24 * 60 * 60 * 1000
     }
   }))
   ```

3. 启动服务，执行 `npm run dev` ，通过 Postman 访问获取博客列表接口，查看 Cookie 是否存在记录

   ![Postman 中查看 Cookie](https://raw.githubusercontent.com/negrochn/study-imooc/master/320/img/Postman%20%E4%B8%AD%E6%9F%A5%E7%9C%8B%20Cookie.gif)



### Redis

1. 安装 redis 和 connect-redis ，执行 `npm i redis connect-redis --save --registry=https://registry.npm.taobao.org`

2. 修改 routes/user.js 文件

   ```js
   // routes/user.js
   
   const { login } = require('../controller/user')
   const { SuccessModel, ErrorModel } = require('../model/resModel')
   
   router.post('/login', (req, res, next) => {
     const { username, password } = req.body
     return login(username, password).then(data => {
       if (data) {
         // 设置 session
         req.session.username = data.username
         req.session.realname = data.realname
         // express-session 直接同步到 redis 中，不需要再 set(req.sessionId, req.session)
         // // 同步到 redis
         // set(req.sessionId, req.session)
   
         res.json(new SuccessModel())
       } else {
         res.json(new ErrorModel('登录失败'))
       }
     })
   })
   ```

3. 修改 db/redis.js 文件

   ```js
   // db/redis.js
   
   const redis = require('redis')
   const { REDIS_CONF } = require('../conf/db')
   
   const redisClient = redis.createClient({
     host: REDIS_CONF.host,
     port: REDIS_CONF.port
   })
   
   redisClient.on('error', err => {
     if (err) {
       console.error(err)
     }
   })
   
   module.exports = redisClient
   ```

4. 修改 app.js 文件

   ```js
   // app.js
   
   const RedisStore = require('connect-redis')(session)
   const redisClient = require('./db/redis')
   
   app.use(session({
     store: new RedisStore({
       client: redisClient
     })
   }))
   ```

5. 启动 Redis

6. 启动 Node ，通过 Postman 访问登录接口，并查看是否已同步到 Redis

   ![Postman 调用并查看 Redis](https://raw.githubusercontent.com/negrochn/study-imooc/master/320/img/Postman%20%E8%B0%83%E7%94%A8%E5%B9%B6%E6%9F%A5%E7%9C%8B%20Redis.gif)



### 登录中间件

创建并进入 middleware 文件夹，创建 loginCheck.js 文件

```js
// middleware/loginCheck.js

const { ErrorModel } = require('../model/resModel')

const loginCheck = (req, res, next) => {
  if (req.session.username) {
    next()
    return
  }
  res.json(new ErrorModel('未登录'))
}

module.exports = loginCheck
```



### 开发路由

#### 博客列表

1. 修改 routes/blog.js 文件

   ```js
   // routes/blog.js
   const { getList } = require('../controller/blog')
   
   router.get('/list', (req, res, next) => {
     let { author, keyword, isadmin } = req.query
     // 管理员界面
     if (isadmin) {
       // 未用到 loginCheck 中间件来判断，而是直接使用 req.session.username 来判断
       if (req.session.username == null) {
         res.json(new ErrorModel('尚未登录'))
         return
       }
       // 强制查看自己的博客
       author = req.session.username
     }
     return getList(author, keyword).then(data => {
       res.json(new SuccessModel(data))
     })
   })
   ```

2. 启动 Redis ，启动 Nginx ，启动 Node

3. 通过 Postman 测试获取博客列表接口

#### 博客详情

```js
// routes/blog.js

const { getDetail } = require('../controller/blog')

router.get('/detail', (req, res, next) => {
  return getDetail(req.query.id).then(data => {
    res.json(new SuccessModel(data))
  })
})
```

#### 新建博客

```js
// routes/blog.js

const { addBlog } = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  return addBlog(req.body).then(data => {
    res.json(new SuccessModel(data))
  })
})
```

#### 更新博客

```js
// routes/blog.js

const { updateBlog } = require('../controller/blog')

router.post('/update', loginCheck, (req, res, next) => {
  return updateBlog(req.query.id, req.body).then(data => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})
```

#### 删除博客

```js
// routes/blog.js

const { delBlog } = require('../controller/blog')

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  return delBlog(req.query.id, author).then(data => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除博客失败'))
    }
  })
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



### 日志

- access 日志，直接使用脚手架推荐的 morgan
- 自定义日志使用 console.log 和 console.error

#### morgan

1. 创建 logs 文件夹

2. 修改 package.json 文件

   ```js
   // package.json
   
   {
     "scripts": {
       "prd": "cross-env NODE_ENV=production nodemon ./bin/www"
     },
   }
   ```

3. 修改 app.js 文件

   ```js
   // app.js
   
   const fs = require('fs')
   const path = require('path')
   
   // 正式环境则写入 access.log 文件，开发环境则输出到控制台
   if (process.env.NODE_ENV === 'production') {
     const fileName = path.join(__dirname, 'logs', 'access.log')
     const writeStream = fs.createWriteStream(fileName, {
       flags: 'a'
     })
     app.use(logger('combined', {
       stream: writeStream
     }))
   } else {
     app.use(logger('dev'))
   }
   ```

4. 启动 Node 服务，执行 `npm run prd`

5. 访问 http://localhost:8080/ ，测试博客项目的功能，并查看 logs/access.log 是否有对应的日志



## Express 中间件原理

### 分析

- app.use 用来注册中间件，先收集起来
- 遇到 http 请求，根据 path 和 method 判断触发哪些
- 实现 next 机制，即上一个通过 next 触发下一个

### 代码实现

```js
const { stat } = require('fs')
const http = require('http')
const router = require('./320/code/blog-express/routes/blog')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [], // app.use()
      get: [], // app.get()
      post: [] // app.post()
    }
  }

  register(path) {
    const info = {}
    if (typeof path === 'string') {
      info.path = path
      // 从第二个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      // 从第一个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  match(method, url) {
    let stack = []
    if (url === '/favicon.ico') {
      return stack
    }
    // 获取 routes
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])

    curRoutes.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0) {
        // url === '/api/get-cookie' 且 routeInFO.path === '/'
        // url === '/api/get-cookie' 且 routeInFO.path === '/api'
        // url === '/api/get-cookie' 且 routeInFO.path === '/api/get-cookie'
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }

  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()

      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress()
}
```

