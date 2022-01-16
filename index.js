//'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('produtos.json');
let products = JSON.parse(rawdata);

const fileupload = require('express-fileupload')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const pageFolder = __dirname.replace("vacsinaserver", "vacsina");
const tilesheetFolder = __dirname+"/tilesheets/";

app.use(express.static(pageFolder));
app.use(fileupload(), );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/editor/newmap', function(req, res){
  let conteudo = JSON.stringify(req.body);
  conteudo = conteudo.replace(/input-/g, "");
  const mapfile = JSON.parse(conteudo);
  const tp = 'map'+ mapfile['mapname'] +'.json';
  fs.writeFile('maps/'+tp, conteudo, 'utf8', function (err) {
    if (err) throw err;
  });
  res.redirect('/editor?input-tilemap='+tp);
});

app.get('/tilemaps', function(req, res){
  //let conteudo = JSON.stringify(req.body);
  const conteudo = fs.readdirSync(__dirname+"/maps");
  res.send(conteudo);
});

app.post('/editor/loadmap', function(req, res){
  let conteudo = req.body['mapname'];
  console.log(conteudo);
  const mapfile = fs.readFileSync(__dirname+"/maps/"+conteudo);
  if(conteudo != undefined) res.send(mapfile);
  else res.send("Empty");
});

app.post('/editor/newtilesheet', function(req, res){
  let conteudo = JSON.stringify(req.body);
  conteudo = conteudo.replace(/input-/g, "");
  const tsfile = JSON.parse(conteudo);
  tsfile.tiles = [];

  const ispace = tsfile.space;
  const nw = tsfile.pixels + ispace;
  if (tsfile.src.length > 0) {
    var fileReader = new FileReader();

    fileReader.onload = (event) => 
    {
      console.log(tsfile.src);
      const img = event.target.result;
      const maxColum = Math.ceil((img.width + ispace) / (nw));
      const maxRow = Math.ceil((img.height + ispace) / (nw));
    
      console.log(tsfile.pixels + " (" + maxColum+","+ maxRow +")");
    
      for(let i = 0; i < maxColum; i++){
        for(let j = 0; j < maxColum; j++){
          const id = i+(j*maxColum);
          tsfile.tiles.push({id:id, block:false});
        }
      }
    
      conteudo = JSON.stringify(tsfile);
      const tp = 'tilesheet'+ tsfile['name'] +'.json';
      fs.writeFile(tilesheetFolder+tp, conteudo, 'utf8', function (err) {
        if (err) throw err;
      });
      res.redirect('/editor');
    };

    fileReader.readAsDataURL(tsfile.src);
  }

});

app.get('/tilesheets', function(req, res){
  const conteudo = fs.readdirSync(tilesheetFolder);
  res.send(conteudo);
});

app.post('/editor/loadtilesheet', function(req, res){
  let conteudo = req.body['name'];
  console.log(conteudo);
  const mapfile = fs.readFileSync(tilesheetFolder+conteudo);
  if(conteudo != undefined) res.send(mapfile);
  else res.send("Empty");
});

app.post('/saveImage', (req, res) => {
  const fileName = req.files.myFile.name
  const path = __dirname + '/images/' + fileName

  image.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
  })
})

app.listen(8000);