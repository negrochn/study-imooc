const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const { method, path } = req
  // 将获取 id 操作挪到上面
  const { id } = req.query

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const { author, keyword } = req.query
    return getList(author, keyword).then(data => new SuccessModel(data))
  }
  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(id).then(data => new SuccessModel(data))
  }
  // 新增博客
  if (method === 'POST' && path === '/api/blog/new') {
    req.body.author = 'negrochn' // 先将 author 硬编码
    return addBlog(req.body).then(data => new SuccessModel(data))
  }
  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
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
    const author = 'negrochn' // // 先将 author 硬编码
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
