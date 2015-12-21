var express = require('express');
var app = express();
var compression = require('compression');
var path = require('path');
var rootPath = path.normalize(__dirname + '/');

app.use(compression());

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



var https = require('https'),      // module for https
    fs =    require('fs');         // required to read certs and keys

var options = {
    key:    fs.readFileSync('/sec/certs/server-key.pem'),
    cert:   fs.readFileSync('/sec/certs/server-cert.pem'),
    ca:     [fs.readFileSync('/sec/certs/gd_bundle-g2.crt'),fs.readFileSync('/sec/certs/HHSPIVcachn.pem')],
    requestCert:        false,
    rejectUnauthorized: false,
};

https.createServer(options, app).listen(4400);


app.get('/', function(req, res) {
  res.render('index');
  //res.render("views/index");
});