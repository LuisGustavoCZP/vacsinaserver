module.exports = function Routes (app, rootPath, ...modules)
{
    const fs = modules[0];
    const tilesheetFolder = rootPath+"/tilesheets/";
    const tilesheetImgFolder = rootPath+"/images/";

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
            fs.writeFile(tilesheetFolder+"sheet_"+conteudo.data.name+".json", JSON.stringify(conteudo.data), 'utf8', function (err) {
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

    app.get('/tilesheets/:file', function(req, res){
        const filename = req.params["file"];
        const conteudo = fs.readFileSync(`${tilesheetImgFolder}tilesheets/${filename}`);
        if(conteudo != undefined) res.send(conteudo);
        else res.send("{}");
    });

    app.get('/editor/loadtilesheet', function(req, res){
        let conteudo = req.query['name'];
        console.log(conteudo);
        const mapfile = fs.readFileSync(tilesheetFolder+conteudo);
        if(conteudo != undefined) res.send(mapfile);
        else res.send("{}");
    });

    app.post('/saveImage', (req, res) => {
        const fileName = req.files.myFile.name
        const path = rootPath + '/images/' + fileName

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
            });

            res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }));
        })
    });
}