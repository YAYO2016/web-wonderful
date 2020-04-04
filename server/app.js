var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

/************************************开发开始************************************/

//cors 解决跨域访问
const cors = require('cors');
//引入body-parser，用来传递post请求的数据
const bodyParser = require('body-parser');
//引入jwt认证中间件
const jwtAuth = require("./utils/jwt.js");

//使用cors中间件
app.use(cors());
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//使用jwt中间件
app.use(jwtAuth);


/***********************************开发结束*************************************/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//导入路由
const indexRouter = require("./routes/index");
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
