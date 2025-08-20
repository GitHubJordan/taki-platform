const { DataTypes } = require('sequelize')
const Usuario = require('./User')
const db = require('./db')

const Perfil = db.seql.define("Perfil", {
    id: {
      type: db._sequel.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: db._sequel.INTEGER,
      allowNull: false,

/*       references: {
        model: "usuarios", // deve ser o mesmo que tableName do Usuario
        key: "id"
      },

      onDelete: "CASCADE",
      onUpdate: "CASCADE" */

    },
    nome_completo: {
      type: db._sequel.STRING(255),
      allowNull: false
    },
    foto_url: {
      type: DataTypes.STRING(255)
    },
    capa_url: {
      type: db._sequel.STRING(255)
    },
    biografia: {
      type: db._sequel.TEXT
    },
    nivel: {
      type: db._sequel.ENUM(
        "Explorador",
        "Viajante Social",
        "Influenciador Local",
        "VIP TAKI",
        "Embaixador TAKI"
      ),
      defaultValue: "Explorador"
    },
    total_viagens: {
      type: db._sequel.INTEGER,
      defaultValue: 0
    },
    total_pontos: {
      type: db._sequel.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: "perfis",
    timestamps: false
  });
  
/*//Associação 1 para 1
Usuario.hasOne(Perfil, { foreignKey: "usuario_id" });
Perfil.belongsTo(Usuario, { foreignKey: "usuario_id" });*/
  

//Perfil.sync({force:true})

module.exports = Perfil;