const { sequelize, DataTypes } = require('./db')

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.ENUM("passageiro", "motorista"),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  senha_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  ultimo_login: {
    type: DataTypes.DATE
  },
  telefone: {
    type: DataTypes.STRING(20)
  },
  status: {
    type: DataTypes.ENUM("ativo", "inativo", "suspenso"),
    defaultValue: "ativo"
  }
}, {
  tableName: "usuarios",
  timestamps: false
})

// força criar tabela se não existir
Usuario.sync({ alter: true })  

module.exports = Usuario
