const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const conn = mysql.createConnection(MYSQL_CONF)

// 开始连接
conn.connect()

// 统一执行 sql 的函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}