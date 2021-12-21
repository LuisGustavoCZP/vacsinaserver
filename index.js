//'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('produtos.json');
let products = JSON.parse(rawdata);

var bodyParser = require('body-parser');
const express = require('express');
const app = express();

const pageFolder = __dirname.replace("vacsinaserver", "vacsina");
app.use(express.static(pageFolder));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/editor', function(req, res){
  var conteudo = JSON.stringify(req.body);
  fs.writeFile('nome-do-ficheiro.txt', conteudo, 'utf8', function (err) {
    if (err) throw err;
    // correr código aqui depois do ficheiro estar gravado

  });
});

/*app.get('*', function(req, res) {
  // `req` is an instance of Node.js' built-in HTTP request class,
  // with some additional features from Express
  req instanceof require('http').IncomingMessage; // true
  //res.send('id: ' + req.query.id);
  //console.log(req.params.id);
  const arry = req.query["input-mapname"] != undefined ? products.filter(x => {return x.id == req.query.id}) : products;
  res.json(arry);
});*/

app.listen(8000);

/*var static = require('node-static');
var http = require('http');

var file = new(static.Server)(pageFolder);

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(8000);*/