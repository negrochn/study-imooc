const http = require('http')
const handleServer = require('../app')
const PORT = 8000

const server = http.createServer(handleServer)

server.listen(PORT)
