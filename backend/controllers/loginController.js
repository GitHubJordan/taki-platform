require('dotenv').config({path:
require('path').resolve(__dirname,'../.env')})

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function loginUser(req,res){


    try{

        const dado = {
            email: req.body.email,
            pass: req.body.password
        }

        //Validar  
        if (!dado.email){return res.status(422).json({msg:"O email é obrigatorio"})}
        if (!dado.pass){return res.status(422).json({msg:"A password é obrigatoria"})}

        var email = dado.email

        const usuario = await User.findOne({where:{email}});

        if (!usuario){
            return res.status(422).json({msg:"Usuario não encotrado!"})
        }

        //verificar se a senha está correta 
        const passcheck = await bcrypt.compare(dado.pass,usuario.senha_hash)

        if (!passcheck){
            return res.status(422).json({msg:"Password Inválida!"})
        }

        const secret = process.env.SECRET
        const token = jwt.sign({id:usuario.id},secret)

        return res.status(200).json({msg:"Usuario autenticado com sucesso",token})



    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Erro no servidor tente mais tarde"})
    }

}


module.exports = loginUser
