require("dotenv").config();
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const authController = {
    login: async (req, res) => {
        const { username, password } = req.body;

        if(!username){
            return res.status(422).json({msg: "O username é obrigatório!"});
        }
        
        if(!password){
            return res.status(422).json({msg: "A senha é obrigatória!"});
        }

        const profile = await Profile.findOne({ username: username });

        if(!profile) {
            return res.status(404).json({msg: "Perfil não encontrado!"});
        }



        //Utilizando bcrypt para comparar a senha informada no body com a senha
        //que foi trazida do nosso banco de dados
        const checkPassword = await bcrypt.compare(password, profile.password);

        if(!checkPassword) {
            return res.status(422).json({msg: "Senha inválida"});
        }

        try {
            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                  id: profile._id,
                },
                secret
            );

            res.status(200).json({msg: "Autenticação realizada com sucesso!", token})

        } catch (error) {
            res.status(500).json({msg: error})
        }

    }

    
}

module.exports = authController;