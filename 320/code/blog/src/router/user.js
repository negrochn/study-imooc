const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    return login(username, password).then(data => {
      if (data) {
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter