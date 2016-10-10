var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var businessUserManager = require('./routes/businessUserManager');
var partners = require('./routes/partners');
var loginAndOut = require('./routes/loginAndOut');
var field = require('./routes/field');


//采用connect-mongodb中间件作为Session存储  
var session = require('express-session');  
var Settings = require('./database/settings');  
var MongoStore = require('connect-mongodb');  
var db = require('./database/msession'); 



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session配置
app.use(session({
    cookie: { maxAge: 600000 },
    secret: Settings.COOKIE_SECRET,
    store: new MongoStore({
        url: Settings.URL,
        db: db})
}));
//拦截器
app.use(function(req, res, next){
    var url = req.originalUrl;
    console.log(url)
    if (url!="/manager" &&url != "/" && !req.session.user && url.indexOf('loginAndOut')<0) {
       var type = req.query.type;
       if(type.indexOf('p')==0){
         return res.redirect("/manager");
       }
       return res.redirect("/");
    }
    next();
});


app.use('/', routes);
app.use('/businessUser', businessUserManager); //用户管理
app.use('/partners',partners);  //合作商管理
app.use('/loginAndOut',loginAndOut);  //登录 登出
app.use('/field',field);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
