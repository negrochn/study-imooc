const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const { method, path } = req
  // 将获取 id 操作挪到上面
  const { id } = req.query

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let { author, keyword, isadmin } = req.query
    if (isadmin) {
      // 管理员界面
      const checkResult = loginCheck(req)
      if (checkResult) {
        return checkResult
      }
      // 强制查看自己的博客
      author = req.session.username
    }
    return getList(author, keyword).then(data => new SuccessModel(data))
  }
  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(id).then(data => new SuccessModel(data))
  }
  // 新增博客
  if (method === 'POST' && path === '/api/blog/new') {
    const checkResult = loginCheck(req)
    if (checkResult) {
      return checkResult
    }
    req.body.author = req.session.username
    return addBlog(req.body).then(data => new SuccessModel(data))
  }
  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    const checkResult = loginCheck(req)
    if (checkResult) {
      return checkResult
    }
    return updateBlog(id, req.body).then(data => {
      if (data) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }
  // 删除博客
  if (method === 'POST' && path === '/api/blog/del') {
    const checkResult = loginCheck(req)
    if (checkResult) {
      return checkResult
    }
    const author = req.session.username
    return delBlog(id, author).then(data => {
      if (data) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter
