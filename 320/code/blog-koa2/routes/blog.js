const router = require('koa-router')()
const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

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

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data) 
})

router.post('/new', loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username
  const data = await addBlog(ctx.request.body)
  ctx.body = new SuccessModel(data)
  console.log(ctx.body)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const data = await updateBlog(ctx.query.id, ctx.request.body)
  if (data) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const data = await delBlog(ctx.query.id, author)
  if (data) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
