const express = require('express');
const app = express();

const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')


//Config JSON response
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(bodyParser.json())


app.use('/auth', authRoutes)

//Ligar o sevidor
app.listen(8081 , ()=>{
    console.log('servidor ligado')
})