const express = require('express')
const router = express.Router()

const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', (req, res, next) => {
  let { author, keyword, isadmin } = req.query
  // if (isadmin) {
  //   // 管理员界面
  //   const checkResult = loginCheck(req)
  //   if (checkResult) {
  //     return checkResult
  //   }
  //   // 强制查看自己的博客
  //   author = req.session.username
  // }
  return getList(author, keyword).then(data => res.json(new SuccessModel(data)))
})

module.exports = router