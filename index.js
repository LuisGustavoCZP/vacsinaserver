//'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('produtos.json');
let products = JSON.parse(rawdata);
console.log(products);

const express = require('express');
const app = express();

let pageFolder = __dirname.replace("vacsinaserver", "vacsina");
app.use('/static', express.static(pageFolder));
app.get('*', function(req, res) {
  // `req` is an instance of Node.js' built-in HTTP request class,
  // with some additional features from Express
  req instanceof require('http').IncomingMessage; // true
  //res.send('id: ' + req.query.id);
  //console.log(req.params.id);
  const arry = req.query.id != undefined ? products.filter(x => {return x.id == req.query.id}) : products;
  //res.json(arry);
});
app.listen(3000);

/*var static = require('node-static');
var http = require('http');

var file = new(static.Server)(pageFolder);

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(8000);*/