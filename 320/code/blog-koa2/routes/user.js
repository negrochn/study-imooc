const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

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

module.exports = router
