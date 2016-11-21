var http = require('http'),
    express = require('express'),
    nodemailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    transporter = nodemailer.createTransport('smtps://theskynar%40gmail.com:smartandfast@smtp.gmail.com'),
    port = process.env.PORT || 5000;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views','./public');

var createMail = mail => {

  var file = fs.readFileSync('./templates/email.html', {encoding: "utf-8"});
  const regNome = /\{NOME\}/g;
  const regEmail = /\{EMAIL\}/g;
  const regAssunto = /\{ASSUNTO\}/g;
  const regMensagem = /\{MENSAGEM\}/g;
  file = file.replace(regNome, mail.nome);
  file = file.replace(regEmail, mail.email);
  file = file.replace(regAssunto, mail.assunto);
  file = file.replace(regMensagem, mail.mensagem);

  return file;

}

app.post('/email', (req, res) => {
  var options = {};
  options.from = { name: req.body.nome, address: req.body.email };
  options.to = 'theskynar@gmail.com, mabordin98@gmail.com, enricomalvarenga@gmail.com';
  options.subject = 'Skynar - ' + req.body.assunto;
  options.html = createMail(req.body);
  options.envelope = { from: 'theskynar@gmail.com', to: req.body.email };

  transporter.sendMail(options, (error, info) => {
    if(error) res.status(500).send('Erro interno');
    res.send('ok');
  });

});

app.get('/*', (req, res) => res.render('index.html'));

http.createServer(app).listen(port, () => console.log("Server iniciado na porta " + port));
