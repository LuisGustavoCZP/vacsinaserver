//'use strict';

const fs = require('fs');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
const express = require('express');
const { send } = require('express/lib/response');
const app = express();

const pageFolder = __dirname.replace("vacsinaserver", "vacsina");
const tilesheetFolder = __dirname+"/tilesheets/";
const tilesheetImgFolder = __dirname+"/images/";//tilesheets/

app.use(express.static(pageFolder));
app.use(express.static(tilesheetImgFolder));
//app.use(fileupload(), );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/editor/newmap', function(req, res){
  let conteudo = JSON.stringify(req.body);
  conteudo = conteudo.replace(/input-/g, "");
  const mapfile = JSON.parse(conteudo);
  mapfile.tiles = [];
  for(let i = 0; i < mapfile.size; i++)
  {
    for(let j = 0; j < mapfile.size; j++)
    {
      mapfile.tiles.push({"x":j, "y":i, "type":0});
    }
  }
  //console.log(mapfile);
  conteudo = JSON.stringify(mapfile);
  const tp = 'map'+ mapfile['mapname'] +'.json';
  fs.writeFile('maps/'+tp, conteudo, 'utf8', function (err) {
    if (err) throw err;
  });
  res.redirect('/editor?input-tilemap='+tp);
});

app.post('/editor/modmap', function(req, res){
  
  const conteudo = req.body;
  const tp = 'map'+ conteudo['mapname'] +'.json';
  
  const mapfile = JSON.parse(fs.readFileSync(__dirname+"/maps/"+tp));
  mapfile.tiles = conteudo.tiles;
  /* for(let i = 0; i < conteudo.tiles.lenght; i++)
  {
    const n = conteudo.tiles[i];
    //const id = n.x + (n.y*(Math.sqrt(tiles.lenght)));
    mapfile.tiles[i] = n;
  } */
  //console.log(mapfile);
  let infodata = JSON.stringify(mapfile);
  console.log(mapfile.mapname);

  fs.writeFile('maps/'+tp, infodata, 'utf8', function (err) {
    if (err) throw err;
  });
  res.send("true");
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

app.post('/editor/newtilesheet', function(req, res)
{
  const conteudo = req.body;

  const tsfile = conteudo.file;
  if (tsfile) 
  {
    const data = tsfile.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, 'base64');
    const srcPth = tilesheetImgFolder+conteudo.data.name+".png";

    fs.writeFile(srcPth, buf, function (err) {
      if (err) throw err;
      console.log("Success saved: " + srcPth);
    });
    
    conteudo.data.src = srcPth;
    fs.writeFile(tilesheetFolder+conteudo.data.name+".json", JSON.stringify(conteudo.data), 'utf8', function (err) {
      if (err) throw err;
      console.log("Success saved: " + conteudo.data.name);
    });
  }
  res.send(true);
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
  else res.send("{}");
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