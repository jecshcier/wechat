var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')({
    cookie: {
        maxAge: 1000 * 60 * 30
    },
    secret: 'wechat',
    resave: true,
    saveUninitialized: true
});
var index = require('./routes/index');
var users = require('./routes/users');
var wechatModual = require('./routes/wechat')
var config = require('./config')

var app = express();
var sourcePath = config.sourceRealPath || path.join(__dirname, '/public/resources')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session);
app.use(config.serverName + config.staticPathName, express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))

// console.log(express.static(path.join(__dirname, 'public')))
console.log(path.resolve(__dirname, sourcePath))
app.use(config.serverName + config.sourcePathName, express.static(sourcePath));
app.use(express.query());
console.log(config.serverDomain + config.serverName + config.sourcePathName + '/images/1.png')
app.use(config.serverName + '/test', index);
// app.use(config.serverName + '/users', users);

app.use('/wechat', wechatModual)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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