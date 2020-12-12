let MYSQL_CONF
let REDIS_CONF
const env = process.env.NODE_ENV

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'myblog'
  }
  REDIS_CONF = {
    host: 'localhost',
    port: 6379
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'myblog'
  }
  REDIS_CONF = {
    host: 'localhost',
    port: 6379
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}