const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient({
  host: REDIS_CONF.host,
  port: REDIS_CONF.port
})

redisClient.on('error', err => {
  if (err) {
    console.error(err)
  }
})

module.exports = redisClient