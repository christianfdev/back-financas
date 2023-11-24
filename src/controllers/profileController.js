const Profile = require('../models/Profile');

const profileController = {
    create: async (req, res) => {

        try {
            const profile = {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                registers: req.body.registers,
            }
            
            const response = await Profile.create(profile);

            res.status(201).json({response, msg: 'Perfil criado com sucesso.'});
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

            if(!profile){
                res.status(404).json({msg: 'Perfil não encontrado'});
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

            if(!profile){
                res.status(404).json({msg: 'Perfil não encontrado'});
                return
            }

            const deletedProfile = await Profile.findByIdAndDelete(id);

            res.status(200).json({deletedProfile, msg: 'Perfil deletado com sucesso.'});
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

            if(!updatedProfile) {
                res.status(404).json({msg: 'Perfil não encontrado.'});
                return;
            }

            //Mantendo atualmente o retorno das informações 
            //Apenas para questões de teste
            res.json(200).json({profile, msg: 'Perfil atualizado com sucesso.'})
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    }
}

module.exports = profileController;