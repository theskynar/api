module.exports = (sequelize, dataTypes) => {
  var email = sequelize.define('email', {
    nome: {
      type: dataTypes.STRING(255)
    },
    email: {
      type: dataTypes.STRING(255),
      allowNull:false,
      validate: {
        isEmail:true
      }
    },
    assunto: {
      type: dataTypes.STRING(255)
    },
    msg: {
      type: dataTypes.STRING(255)
    }

  })
}
