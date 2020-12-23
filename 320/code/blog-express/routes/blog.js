const express = require('express')
const router = express.Router()

const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

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

router.get('/detail', (req, res, next) => {
  return getDetail(req.query.id).then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  return addBlog(req.body).then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  return updateBlog(req.query.id, req.body).then(data => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})

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

module.exports = router