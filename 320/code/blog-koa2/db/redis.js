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

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}