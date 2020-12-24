const router = require('koa-router')()
const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  let { author, keyword, isadmin } = ctx.query
  // 管理员界面
  if (isadmin) {
    // 未用到 loginCheck 中间件来判断，而是直接使用 req.session.username 来判断
    if (req.session.username == null) {
      ctx.body = new ErrorModel('尚未登录')
      return
    }
    // 强制查看自己的博客
    author = req.session.username
  }
  
  const data = await getList(author, keyword)
  ctx.body = new SuccessModel(data)
})

module.exports = router
