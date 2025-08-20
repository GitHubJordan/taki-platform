const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')


//Importar o Registercontroller
const controllerRegister = require('../controllers/registerController')

//Importar o logincontroller
const controllerlogin = require('../controllers/loginController')

//Importar o modelUser
const User = require('../models/User')

router.get('/', (req,res)=>{
    return res.status(200).json({msg: 'TAKI API'})
})

router.post('/register', controllerRegister)

router.post('/login', controllerlogin)

//Middleware para acesso ao perfil
function checartoken(req,res,next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({msg:"acesso negado"})
    }

    try{

        const secret = process.env.SECRET
        const decoded = jwt.verify(token,secret)
        req.userId = decoded.id 

        next()

        
    } catch (error){
        return res.status(400).json({msg:"token inválido!"})
    }

}

router.get('/me', checartoken,async(req,res)=>{

    const id = req.userId

    try {
   
        const user = await User.findOne({where:{id}});

        if (!user){

            return res.status(404).json({msg:"Nenhum usuario encotrado"})
        } 

        return res.status(200).json({email:user.email,tipo:user.tipo})
    } catch (error) {

       
        return res.status(500).json({msg:"Erro no servidor tente mais tarde"})

    }

}) 

module.exports = router