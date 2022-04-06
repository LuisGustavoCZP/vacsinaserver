const port = 8000;
const fs = require('fs');
const cors = require('cors');
const crypto = require('crypto');
/* const fileupload = require('express-fileupload');
const { send } = require('express/lib/response'); */

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./modules/users');
const express = require('express');

const Tilemap = require('./modules/tilemaps');
const Tilesheet = require('./modules/tilesheets');
const rootPath = __dirname;
const tilesheetImgFolder = rootPath+"/images/";
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = 
{
    origin:'http://localhost:8080', 
    credentials:true
};
app.use(cors(corsOptions));
//app.use(cors());

//app.use(express.static(tilesheetImgFolder));

app.post("/login", users.login);

app.get("/test", users.verify, (req, res) => 
{
    console.log(req.userid);
    res.json({userid:req.userid});
});

Tilemap(app, rootPath, fs);
Tilesheet(app, rootPath, fs);

app.listen(port, () => {console.log(`Starting server at ${port}`)});