const express = require('express');
const app = express();
const consign =  require('consign');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('../db.js');
const compression = require('compression');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt =require('jsonwebtoken');



app.set('secret', 'fuckinGAssHole12345');
app.engine('html', require('ejs').renderFile);
app.set('views', './public');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log("## Carregando arquivos ##");
consign()
  .include('dash/api')
  .then('dash/routes')
  .then('site/api')
  .then('site/routes')
  .into(app, io, jwt, cryptojs, db, _);
console.log("## Todos os arquivos foram carregados ##");


module.exports = http;
