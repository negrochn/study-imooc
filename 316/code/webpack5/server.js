const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./build-base-conf/webpack.config')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {}))

app.listen(3000, () => {
  console.log('server listening on port 3000!\n')
})