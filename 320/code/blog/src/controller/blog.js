const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    author = escape(author)
    sql += `and author=${author} `
  }
  if (keyword) {
    keyword = escape(`%${keyword}%`)
    sql += `and title like ${keyword} `
  }
  sql += `order by createtime desc;`
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id =${id};`
  return exec(sql).then(([row]) => row)
}

const addBlog = (blogData = {}) => {
  let { title, content, author } = blogData
  const createTime = Date.now()
  title = escape(xss(title))
  content = escape(xss(content))
  author = escape(author)
  const sql = `insert into blogs(title, content, createtime, author) values(${title}, ${content}, ${createTime}, ${author});`
  return exec(sql).then(({ insertId }) => ({ id: insertId }))
}

const updateBlog = (id, blogData = {}) => {
  let { title, content } = blogData
  title = escape(title)
  content = escape(content)
  const sql = `update blogs set title=${title}, content=${content} where id=${id};`
  return exec(sql).then(({ affectedRows }) => affectedRows > 0)
}

const delBlog = (id, author) => {
  author = escape(author)
  const sql = `delete from blogs where id=${id} and author=${author};`
  return exec(sql).then(({ affectedRows }) => affectedRows > 0)
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}