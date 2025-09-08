const { sequelize, DataTypes } = require('./db')

const Perfil = sequelize.define("Perfil", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome_completo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  foto_url: {
    type: DataTypes.STRING(255)
  },
  capa_url: {
    type: DataTypes.STRING(255)
  },
  biografia: {
    type: DataTypes.TEXT
  },
  nivel: {
    type: DataTypes.ENUM(
      "Explorador",
      "Viajante Social",
      "Influenciador Local",
      "VIP TAKI",
      "Embaixador TAKI"
    ),
    defaultValue: "Explorador"
  },
  total_viagens: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  total_pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: "perfis",
  timestamps: false
})

Perfil.sync({ alter: true })  

module.exports = Perfil
