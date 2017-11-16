var express = require('express');
var app = express();
var fs = require("fs");

var user = require('./router/user');

app.use('/listUsers', user);

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})