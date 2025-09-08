require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
})

const { Sequelize, DataTypes } = require('sequelize')

// cria a conexão com base nas variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false // opcional: remove os logs SQL
  }
)

// exporta o sequelize e o DataTypes (para os models)
module.exports = { sequelize, DataTypes }

// Testa a conexão
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com o banco bem sucedida')
  })
  .catch((erro) => {
    console.error('❌ Falha na conexão:', erro)
  })

// Sincronizar models automaticamente
sequelize.sync({ alter: true }) // cria/atualiza tabelas se não existirem
  .then(() => {
    console.log('📦 Tabelas sincronizadas com sucesso')
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar tabelas:', err)
  })
