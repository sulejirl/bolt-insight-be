var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose')


var indexRouter = require('./routes');

var server = express();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
const mongoUri = 'mongodb+srv://bolt-case:bolt1@cluster0.zqazt.mongodb.net/bolt-db?retryWrites=true&w=majority'
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.all('*', function (req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT,PATCH, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
server.use('/', indexRouter);
// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});


if (!module.parent) {
  server.listen(port, () => {
    console.log('Magic happens on port ' + port);
    mongoose.connect(mongoUri, options);
    const conn = mongoose.connection;
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', () => {
      console.log('Connected to Database');
    });
  });
}

module.exports = server;
