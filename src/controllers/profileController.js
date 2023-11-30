const Profile = require('../models/Profile');

const bcrypt = require("bcrypt");


const profileController = {
    create: async (req, res) => {

        try {

            const { username, password, name, registers } = req.body;

            const profileExists = await Profile.findOne({ username: username })

            if (profileExists) {
                return res.status(422).json({ msg: "Por favor, utilize outro username" });
            }

            //Create password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            //Create profile
            const profile = new Profile({
                username,
                password: passwordHash,
                name,
                registers,
            })

            try {

                const response = await Profile.create(profile);
                
                res.status(201).json({ response, msg: 'Perfil criado com sucesso.' });
            } catch (error) {
                console.log(error);

                res.status(500).json({ msg: "Aconteceu um erro no servidor ao tentar criar um perfil. Tente novamente mais tarde." })
            }



        } catch (error) {
            console.log(`Erro: ${error}`);
        }

    },
    getAll: async (req, res) => {
        try {
            const profiles = await Profile.find();

            res.json(profiles);
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;

            const profile = await Profile.findById(id);

            if (!profile) {
                res.status(404).json({ msg: 'Perfil não encontrado' });
                return
            }

            res.json(profile);
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            const profile = await Profile.findById(id);

            if (!profile) {
                res.status(404).json({ msg: 'Perfil não encontrado' });
                return
            }

            const deletedProfile = await Profile.findByIdAndDelete(id);

            res.status(200).json({ deletedProfile, msg: 'Perfil deletado com sucesso.' });
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            //Atualizando dessa forma enquanto não implemento
            //A segurança do password do Perfil 
            //E as telas no front relacionadas a alteração de senha
            const profile = {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                registers: req.body.registers,
            }

            const updatedProfile = await Profile.findByIdAndUpdate(id, profile);

            if (!updatedProfile) {
                res.status(404).json({ msg: 'Perfil não encontrado.' });
                return;
            }

            //Mantendo atualmente o retorno das informações 
            //Apenas para questões de teste
            res.json(200).json({ profile, msg: 'Perfil atualizado com sucesso.' })
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    }
}

module.exports = profileController;