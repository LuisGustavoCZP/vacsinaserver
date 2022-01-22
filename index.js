//'use strict';

const fs = require('fs');
/* const fileupload = require('express-fileupload');
const { send } = require('express/lib/response'); */

const bodyParser = require('body-parser');
const express = require('express');

const Tilemap = require('./modules/tilemaps');
const Tilesheet = require('./modules/tilesheets');
const rootPath = __dirname;
const tilesheetImgFolder = rootPath+"/images/";
const app = express();

const pageFolder = rootPath.replace("vacsinaserver", "vacsina");

app.use(express.static(pageFolder));
app.use(express.static(tilesheetImgFolder));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Tilemap(app, rootPath, fs);
Tilesheet(app, rootPath, fs);

app.listen(8000);