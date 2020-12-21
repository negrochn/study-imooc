const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crypto')

const login = (username, password) => {
  username = escape(username)
  password = escape(genPassword(password))
  // 使用 escape 之后会自动带上 ''
  const sql = `select username, realname from users where username=${username} and password=${password};`
  return exec(sql).then(([row]) => row)
}

module.exports = {
  login
}