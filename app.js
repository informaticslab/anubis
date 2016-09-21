var express = require('express');
var app = express();
//var compression = require('compression');
var path = require('path');
var rootPath = path.normalize(__dirname + '/');
var properties = require('./envProperties');
httpsPort = 4400;
httpPort = 4044;

//app.use(compression());

app.set('views', rootPath+'/public/views')
app.set('view engine','jade');
//app.set('views', rootPath + '/public/views');
//app.set('bower_components', rootPath + '/public/bower_components');
app.use(express.static(rootPath+'/public'));

if(properties.USESSL == 'false')
{
var server = app.listen(httpPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});
}
else if (properties.USESSL == 'true')
{
 var https = require('https'),      // module for https
    fs =    require('fs');         // required to read certs and keys

var options = {
    key:    fs.readFileSync(properties.SSL_KEY),
    cert:   fs.readFileSync(properties.SSL_CERT),
    ca:     fs.readFileSync(properties.SSL_BUNDLE),
    requestCert:        false,
    rejectUnauthorized: false,
};

https.createServer(options, app).listen(httpsPort);

console.log('https app listening at '+ httpsPort);
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    //res.writeHead(301, { "Location": "https://localhost:4400" });
    res.end();
}).listen(httpPort);

console.log('http redirect listening at '+ httpPort);
}
app.get('/', function(req, res) {
  res.render('index');
  //res.render("views/index");
});