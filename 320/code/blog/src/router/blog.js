const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const { method, path } = req
  // 将获取 id 操作挪到上面
  const { id } = req.query

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const { author, keyword } = req.query
    return new SuccessModel(getList(author, keyword))
  }
  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return new SuccessModel(getDetail(id))
  }
  // 新增博客
  if (method === 'POST' && path === '/api/blog/new') {
    return new SuccessModel(addBlog(req.body))
  }
  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客失败')
    }
  }
  // 删除博客
  if (method === 'POST' && path === '/api/blog/del') {
    const result = delBlog(id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter
