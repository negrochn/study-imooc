const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id =${id};`
  return exec(sql).then(([row]) => row)
}

const addBlog = (blogData = {}) => {
  const { title, content, author } = blogData
  const createTime = Date.now()
  let sql = `insert into blogs(title, content, createtime, author) values('${title}', '${content}', ${createTime}, '${author}');`
  return exec(sql).then(({ insertId }) => ({ id: insertId }))
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}