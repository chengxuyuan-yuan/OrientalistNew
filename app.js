var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fs = require('fs')
var path = require('path')
var rfs = require('rotating-file-stream')
var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var doOrderRouter = require('./routes/doOrder')
var controlRouter = require('./routes/control')
var canshuRouter = require('./routes/canshu')
var setRouter = require('./routes/set')
var logRouter = require('./routes/log')
var chedanRouter = require('./routes/chedan')
var controller = require('./controller')
var app = express();

// view engine setup
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "content-type");  
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");  
    // res.header("X-Powered-By", ' 3.2.1');  
    // res.header("Content-Type", "application/json;charset=utf-8");  
    if (req.method == 'options' || req.method == 'OPTIONS') {
        res.send(200)
    }
    next();
});
// app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/doOrder', doOrderRouter);
app.use('/control', controlRouter);
app.use('/canshu', canshuRouter);
app.use('/set', setRouter);
app.use('/log', logRouter);
app.use('/chedan', chedanRouter);
app.post('/list', controller.list)
app.post('/detail', controller.detailed)
app.post('/doOrder', controller.doOrder)
app.post('/userLogin', controller.userLogin)
app.post('/start', controller.start)
app.post('/stop', controller.stop)
app.post('/amount', controller.amount)
app.post('/seachAmount', controller.seachAmount)
app.post('/history', controller.history)
app.post('/getLog', controller.getLog)
app.post('/getLogList', controller.getLogList)
app.post('/getYesterdayBuyList', controller.getYesterdayBuyList)
app.post('/holdPositions', controller.holdPositions)
app.post('/alerdayLImitupList', controller.alerdayLImitupList)
    // app.post('./doOrder', controller.doOrder)
    // app.post('./doOrder', controller.doOrder)

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