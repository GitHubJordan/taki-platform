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
    },
    nome_completo: {
      type: db._sequel.STRING(255),
      allowNull: false
    },
    foto_url: {
      type: db._sequel.STRING(255)
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
  
//Perfil.sync({force:true})

module.exports = Perfil;