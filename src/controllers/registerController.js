const { Register } = require('../models/Register');

const registerController = {
    create: async (req, res) => {
        try {

            const register = {
                type: req.body.type,
                category: req.body.category,
                value: req.body.value,
                date: req.body.date,
            }

            const response = await Register.create(register);
            res.status(201).json({ response, msg: 'Registro criado com sucesso!' });

        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    getAll: async (req, res) => {
        try {
            const registers = await Register.find();

            res.json(registers);
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    get: async (req, res) => {
        try {
            // Primeiro passo é pegar o id
            const id = req.params.id;

            //Agora posso continuar meu get específico
            const register = await Register.findById(id);

            //Validação caso não encontre registro
            if (!register) {
                res.status(404).json({ msg: 'Registro não encontrado' });
                return;
            }

            res.json(register);

        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            //Primeiro encontrar o registro a ser deletado
            const register = await Register.findById(id);

            //Validação caso não encontre registro
            if (!register) {
                res.status(404).json({ msg: 'Registro não encontrado' });
                return;
            }

            const deletedRegister = await Register.findByIdAndDelete(id);

            res
                .status(200)
                .json({ deletedRegister, msg: "Serviço excluído com sucesso" });



        } catch (error) {
            console.log(`Erro: ${error}`)
        }


    },
    update: async (req, res) => {
        const id = req.params.id;

        const register = {
            type: req.body.type,
            category: req.body.category,
            value: req.body.value,
            date: req.body.date,
        }

        const updatedRegister = await Register.findByIdAndUpdate(id, register);

        if(!updatedRegister){
            res.status(404).json({msg: 'Registro não encontrado.'});
        }

        res.status(200).json({updatedRegister, msg: 'Registro atualizado com sucesso.'});
    }
};

module.exports = registerController;