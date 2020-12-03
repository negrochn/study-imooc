const handleServer = (req, res) => {
  // 设置返回数据格式为 JSON
  res.setHeader('Content-Type', 'application/json')

  const resData = {
    name: 'negrochn',
    age: 18,
    env: process.env.NODE_ENV
  }

  res.end(JSON.stringify(resData))
}

module.exports = handleServer
