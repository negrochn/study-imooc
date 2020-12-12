const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { set, get } = require('./src/db/redis')

// 获取 cookie 的过期时间
function getCookieExpires() {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

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
  // 设置返回数据格式为 JSON
  res.setHeader('Content-Type', 'application/json')

  // 获取 path
  const [path, query] = req.url.split('?')
  req.path = path

  // 解析 query
  req.query = querystring.parse(query)

  // 解析 cookie
  req.cookie = querystring.parse(req.headers['cookie'], '; ', '=')

  // 解析 session
  let userId = req.cookie.userid
  let needSetCookie = false
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }
  req.sessionId = userId
  get(userId).then(redisData => {
    if (redisData == null) {
      set(userId, {})
      req.session = {}
    } else {
      req.session = redisData
    }
    // 处理 post data
    return getPostData(req)
  }).then(postData => {
    req.body = postData

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        // 操作 cookie
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理 user 路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        // 操作 cookie
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中路由返回 404
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.write('404 Not Found')
    res.end()
  })
}

module.exports = handleServer
