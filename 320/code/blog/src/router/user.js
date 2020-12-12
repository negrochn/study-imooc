const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    return login(username, password).then(data => {
      if (data) {
        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname
        // 同步到 redis
        set(req.sessionId, req.session)

        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  // 登录验证测试
  if (method === 'GET' && path === '/api/user/login-test') {
    console.log(req.session)
    // 判断 session 中的 username
    if (req.session.username) {
      return Promise.resolve(new SuccessModel(req.session))
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter