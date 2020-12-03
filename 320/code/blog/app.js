const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const { method, url } = req
  const [path, params] = url.split('?')
  const query = querystring.parse(params)
  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }
  // 设置返回数据格式为 JSON ，注意 setHeader 方法的第一个参数的大小写
  res.setHeader('Content-Type', 'application/json')
  
  if (method === 'GET') {
    // end 返回的仍然是字符串格式，但是 JSON 格式的字符串
    res.end(JSON.stringify(resData))
  }
  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = JSON.parse(postData)
      res.end(JSON.stringify(resData))
    })
  }
})

server.listen(8000)
