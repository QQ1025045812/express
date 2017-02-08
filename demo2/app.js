var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db=require('./db');
var index = require('./routes/index');
var users = require('./routes/users');
var methodoverride=require('method-override');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);


app.post('/add',function(req,res){
    db.add({title:req.body.title});
    res.redirect('/');
})
app.post('/update',function(req,res){
  var index=req.body.index;
  console.log(index)
  db.update(index,{title:req.body.title});
  res.redirect('/');
})
app.get('/get/:index',function(req,res){
  var index=req.params.index;
  var article=db.get(index);
  res.send(article);
})
app.get('/del',function(req,res){
    let index=req.query.index;
    db.del(index);
    res.redirect('/');
})
app.use('/login',methodoverride("search"));

// app.use('/login',function(req,res,next){
//   var old=req.method;
//   var nes=req.body.search;
//    console.log(nes)
//    console.log(old)
//   req.method=nes;
//   console.log(req.method)
//   next();
// })
app.search('/login',function(req,res){
  console.log("wuwuwuuwuuwuuuwuuuuuuuuuuuuu")
    res.send("hayh")
    //res.render('error');
})
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
