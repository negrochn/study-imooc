const express = require('express')
const router = express.Router()

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

module.exports = router