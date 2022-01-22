module.exports = function Routes (app, rootPath, ...modules)
{
    const fs = modules[0];

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
        const tp = 'map_'+ mapfile['name'] +'.json';
        fs.writeFile(rootPath+'/maps/'+tp, conteudo, 'utf8', function (err) {
            if (err) throw err;
        });
        res.redirect('/editor?input-tilemap='+tp);
    });
      
    app.post('/editor/modmap', function(req, res){
        const conteudo = req.body;
        const tp = 'map_'+ conteudo['name'] +'.json';
    
        const mapfile = JSON.parse(fs.readFileSync(rootPath+"/maps/"+tp));
        mapfile.tiles = conteudo.tiles;
        let infodata = JSON.stringify(mapfile);
        console.log(mapfile.name);
    
        fs.writeFile(rootPath+'/maps/'+tp, infodata, 'utf8', function (err) {
            if (err) throw err;
        });
        res.send({sucess:true});
    });
    
    app.get('/tilemaps', function(req, res){
        //let conteudo = JSON.stringify(req.body);
        const conteudo = fs.readdirSync(rootPath+"/maps");
        res.send(conteudo);
    });
    
    app.post('/editor/loadmap', function(req, res){
        let conteudo = req.body['name'];
        console.log(conteudo);
        const mapfile = fs.readFileSync(rootPath+"/maps/"+conteudo);
        if(conteudo != undefined) res.send(mapfile);
        else res.send("Empty");
    });
}