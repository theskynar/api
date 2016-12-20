let api = {};

let nodemailer = require('nodemailer'),
    fs = require('fs'),
    transporter = nodemailer.createTransport('smtps://theskynar%40gmail.com:smartandfast@smtp.gmail.com');
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

module.exports = (app, io, jwt, cryptojs, db, _) => {
  api.send = (req, res) => {
    var options = {};
    options.from = { name: req.body.nome, address: req.body.email };
    options.to = 'theskynar@gmail.com, mabordin98@gmail.com, enricomalvarenga@gmail.com';
    options.subject = 'Skynar - ' + req.body.assunto;
    options.html = createMail(req.body);
    options.envelope = { from: 'theskynar@gmail.com', to: req.body.email };
    var body = {
      msg: req.body.mensagem,
      nome: req.body.nome,
      email: req.body.email,
      assunto: req.body.assunto
    }
    transporter.sendMail(options, (error, info) => {
      if(error) return res.status(500).send('Erro interno');
      db.email.create(body).then((email) => {
        return res.status(200).send("Email enviado : " + email);
      }).catch((err) => {
        res.status(500).send("Erro na base de dados.: " + err);
      })
    });
  }

  return api;
}
