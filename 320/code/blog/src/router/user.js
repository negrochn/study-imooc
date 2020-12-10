const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取 cookie 的过期时间
function getCookieExpires() {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const { method, path } = req

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    return login(username, password).then(data => {
      if (data) {
        // 操作 cookie
        res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)

        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  // 登录验证测试
  if (method === 'GET' && path === '/api/user/login-test') {
    if (req.cookie.username) {
      return Promise.resolve(new SuccessModel({
        username: req.cookie.username
      }))
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter