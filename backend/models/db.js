require('dotenv').config({path:
require('path').resolve(__dirname,'../.env')})

const _sequelize = require('sequelize')

const sequel = new _sequelize(process.env.BD_NAME,process.env.BD_USER, process.env.DB_PASS,{
    
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT

}) 

module.exports = {
    _sequel: _sequelize,
    seql: sequel
}

sequel.authenticate().then(()=>{
    console.log('sucesso')
}).catch((erro)=>{
    console.log('falha na conexão')
})