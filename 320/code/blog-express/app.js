var createError = require('http-errors');
var express = require('express');
const fs = require('fs')
const path = require('path')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')

const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express();

// 正式环境则写入 access.log 文件，开发环境则输出到控制台
if (process.env.NODE_ENV === 'production') {
  const fileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(fileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
} else {
  app.use(logger('dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'Negrochn_1222',
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: new RedisStore({
    client: redisClient
  })
}))

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
