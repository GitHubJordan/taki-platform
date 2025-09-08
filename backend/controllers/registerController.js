const User = require('../models/User')
const bcrypt = require('bcrypt')

async function registerUser(req,res){

    try{

            const dados = {

                email: req.body.email,
                telefone: req.body.telefone,
                conf_pass: req.body.confirm,
                tipo: req.body.tipo,
                pass: req.body.password
            }

            //Validar
            if (!dados.telefone){return res.status(422).json({msg:"O telefone é obrigatorio"})}
            if (!dados.email){return res.status(422).json({msg:"O email é obrigatorio"})}
            if (!dados.pass){return res.status(422).json({msg:"A password é obrigatoria"})}
            if (!dados.conf_pass){return res.status(422).json({msg:"Confirmação da password é obrigatoria"})}
            if (!dados.tipo){return res.status(422).json({msg:"O tipo de usuario é obrigatorio"})}
        
            if (dados.pass !== dados.conf_pass) {
                return res.status(422).json({msg:"passwords diferentes"})
            }

            var email = dados.email

            const usuario = await User.findOne({where:{email}});

            if (usuario){
                return res.status(400).json({msg:"E-mail já registrado"})
            }

            //formatar senha 
            const salt = await bcrypt.genSalt(12)
            const passwordhash = await bcrypt.hash(dados.pass,salt)


            try {

                User.create({

                    email: dados.email,
                    senha_hash: passwordhash,
                    tipo: dados.tipo,
                    telefone:dados.telefone
        
                }).then(()=>{
                    return res.status(200).json({msg:"Usuario registrado"})
                }).catch((erro)=>{
                    console.log(erro)
                    return res.status(500).json({msg:"Usuario não registrado"})
                })
                
                
                
            } catch (error){
                console.log(error)
                return res.status(500).json({msg:"Erro ao salvar o usuario tente mais tarde"})
            }

    }catch(erro){
            console.log(erro)
            return res.status(500).json({msg:"Erro no servidor tente mais tarde"})
    }

}


module.exports = registerUser
