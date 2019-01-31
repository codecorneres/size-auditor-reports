const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const Axios = require('axios');
var fs = require('fs');
const app = express();
const AdmZip = require('adm-zip');
var unzip = require('unzip');
const fileUpload = require('express-fileupload');
const cors = require('cors');

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const request = require('request');
const multer = require("multer");
app.use(function (req, res, next) {        
  res.setHeader('Access-Control-Allow-Origin', '*');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
  res.setHeader('Access-Control-Allow-Credentials', true);     
  next();  
});

const port = process.env.PORT || 8000;
app.set('port', port);
/*const server = http.createServer(app);
server.listen(port, () => console.log('Running'));*/
const storage = multer.diskStorage({
  destination: "./src/upload/",
  filename: function(req, file, cb){
     cb(null,"AssetsData.js");
  }
});
const upload = multer({
  storage: storage,
}).single("file");

const storages = multer.diskStorage({
  destination: `${__dirname}/src/upload/`,
  filename: function(req, file, cb){
     cb(null,"moduleData.js");
  }
});
const uploads = multer({
  storage: storages,
}).single("file");
app.post("/Asset", upload, (req, res,next) => {
  res.status(200).send(req.body.modules);
});
app.post('/modules',uploads, (req, res) => {
   res.send(200);
});

app.post('/saveFile',async function(req, res){
  const url = req.body.modules;
  const writer = fs.createWriteStream(`${__dirname}/getzip/modulesData.zip`);
  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', function(){
   var destPath = __dirname + "/src/upload/";
   var stream =fs.createReadStream(`${__dirname}/getzip/modulesData.zip`);
   stream.pipe(unzip.Extract({ path: destPath })).on('close', async function(){
      var content = await fs.readFileSync( __dirname +"/src/upload/modulesData/modulesData.json");
       res.json(JSON.parse(content));
    })
    })
    writer.on('error', reject)
  });
});

app.post('/saveAssetFile', async function(req, res){
  const url = req.body.asset;
  const writer = fs.createWriteStream(`${__dirname}/getzip/AssetsData.zip`)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', function(){
      var destPath = __dirname + "/src/upload/";
      var stream =fs.createReadStream(`${__dirname}/getzip/AssetsData.zip`);
      stream.pipe(unzip.Extract({ path: destPath })).on('close', async function(){
        var contents = await fs.readFileSync( __dirname +"/src/upload/assetsData/assetsData.json");
        res.json(JSON.parse(contents));
      })
    })
    writer.on('error', reject)
  });
});
app.get('/feedback', async function(req, res){
  const url =  'https://twentyfourhourfitness.herokuapp.com/getfeedback';
  const response = await Axios({
    url,
    method: 'GET',
  });
  res.json(response.data)
})
app.post('/feedbackData', async function(req, res){
  const url =  'https://twentyfourhourfitness.herokuapp.com/postfeedback ';
  const response = await Axios({
    url,
    method: 'Post',
    data: req.body,
  });
  res.json(response.data)
})
app.post('/assetsbutton', async function(req, res){
  console.log(req.body);
  return res.sendStatus(200);
})
 
app.post('/ExpressAsset', (req, res, next) => {
  let imageFile = req.files.file;
  imageFile.mv(`${__dirname}/src/upload/AssetsData.js`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({file: `src/upload/AssetsData.js`});
  });
})
app.post('/Expressmodules', (req, res, next) => {
  let imageFile = req.files.file;
  imageFile.mv(`${__dirname}/src/upload/moduleData.js`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({file: `src/upload/moduleData.js`});
  });
})

app.use(express.static(__dirname + '/build'));
app.get('/', function(req,res) {    
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));