const { DataTypes } = require('sequelize')
const db = require('./db')

const Usuario = db.seql.define("Usuario", {
    id: {
      type: db._sequel.INTEGER,       // usando INTEGER para evitar erro de FK no MySQL
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: db._sequel.ENUM("passageiro", "motorista"),
      allowNull: false
    },
    email: {
      type: db._sequel.STRING(255),
      allowNull: false,
      unique: true
    },
    senha_hash: {
      type: db._sequel.STRING(255),
      allowNull: false
    },
    data_cadastro: {
      type: db._sequel.DATE,
      defaultValue: db._sequel.NOW
    },
    ultimo_login: {
      type: db._sequel.DATE
    },
    telefone: {
      type: db._sequel.STRING(20)
    },
    status: {
      type:db._sequel.ENUM("ativo", "inativo", "suspenso"),
      defaultValue: "ativo"
    }
  }, {
    tableName: "usuarios",
    timestamps: false
});
  
//Usuario.sync({force:true})

module.exports = Usuario;