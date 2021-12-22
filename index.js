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

app.post('/editor/newmap', function(req, res){
  var conteudo = JSON.stringify(req.body);
  fs.writeFile('maps/map'+ req.body['input-mapname'] +'.json', conteudo, 'utf8', function (err) {
    if (err) throw err;
  });
  res.redirect('/editor');
});
app.listen(8000);