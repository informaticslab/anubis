var express = require('express');
var app = express();

var path = require('path');
var rootPath = path.normalize(__dirname + '/');



app.set('views', rootPath+'/public/views')
app.set('view engine','jade');
//app.set('views', rootPath + '/public/views');
//app.set('bower_components', rootPath + '/public/bower_components');
app.use(express.static(rootPath+'/public'));


var server = app.listen(4044, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});

app.get('/', function(req, res) {
  res.render('index');
  //res.render("views/index");
});