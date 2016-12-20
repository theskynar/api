const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;


if(env == 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    define: {
      freezeTableName:true
    }
  })
} else {
  var sequelize = new Sequelize('undefined', 'undefined', 'undefined', {
      'dialect': 'sqlite',
      'storage': __dirname + '/data/dev-todo-api.sqlite',
      define: {
        freezeTableName:true
      }
  })
}

var db = {};

db.email = sequelize.import(__dirname + '/model/email.js');
/*db.admin = sequelize.import(__dirname + '/model/admin.js');
db.conteudo = sequelize.import(__dirname + '/model/conteudo.js');
db.orcamento = sequelize.import(__dirname + '/model/orcamento.js');
db.cliente = sequelize.import(__dirname + '/model/cliente.js');

db.orcamento.belongsToMany(db.cliente);
db.cliente.belongsToMany(db.orcamento);*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
