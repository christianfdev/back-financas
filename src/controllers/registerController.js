const { Register } = require('../models/Register');

const categories = ['contas', 'lazer', 'escola', 'aluguel', 'compras', 'salario', 'lucro'];

const registerController = {
    create: async (req, res) => {
        try {

            const register = {
                type: req.body.type,
                category: req.body.category,
                value: req.body.value,
                date: req.body.date,
                userId: req.body.userId
            }

            const response = await Register.create(register);
            res.status(201).json({ response, msg: 'Registro criado com sucesso!' });

        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    getAll: async (req, res) => {
        try {
            const userId = req.params.userId;

            const registers = await Register.find({ userId });

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
    getMonth: async(req, res) => {

        try {
            const userId = req.params.userId;

            const registers = await Register.find({ userId });

            let monthRegisters = [];

            for(let i = 0; i < registers.length; i++){

                if(new Date(registers[i].date).getMonth() == Number(req.params.month) && new Date(registers[i].date).getFullYear() == new Date().getFullYear()) 
                monthRegisters.push(registers[i])

            }

            res.json(monthRegisters);
        
        } catch (error) {
            console.log(`Erro: ${error}`);
        }

    },
    allBalance: async(req, res) => {
        try {

            const userId = req.params.userId;

            const data = await Register.find({ userId });

            let totalDebts = 0;
            let totalEntries = 0;

            for(value of data){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                value.type.includes("gasto") 
                    ? totalDebts += value.value 
                    : totalEntries += value.value;
            }

            let balance = totalEntries - totalDebts;

            let registers = [];

            for(value of data){
                for(category of categories){
                    if(value.category.includes(category) && !registers.some((e) => e.category.includes(category))){

                        let filterData = data.filter((e) => e.category.includes(category));
                        let total = 0;
                        for(i of filterData){
                            total += i.value;
                        }

                        registers.push({type: filterData[0].type, category: filterData[0].category, value: total});
                    }else{
                        continue;
                    }
                }

            }

            console.log(registers);
            
            res.json({registers, totalDebts, totalEntries, balance});
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    monthBalance: async (req, res) => {
        try {

            const userId = req.params.userId;

            const data = await Register.find({ userId });

            let totalDebts = 0;
            let totalEntries = 0;

            let monthRegisters = [];

            for(let i = 0; i < data.length; i++){

                if(new Date(data[i].date).getMonth() == Number(req.params.month) && new Date(data[i].date).getFullYear() == new Date().getFullYear()) 
                monthRegisters.push(data[i])

            }

            for(value of monthRegisters){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                value.type.includes("gasto") 
                    ? totalDebts += value.value 
                    : totalEntries += value.value;
            }

            let balance = totalEntries - totalDebts;

            let registers = [];

            for(value of monthRegisters){
                for(category of categories){
                    if(value.category.includes(category) && !registers.some((e) => e.category.includes(category))){

                        let filterData = monthRegisters.filter((e) => e.category.includes(category));
                        let total = 0;
                        for(i of filterData){
                            total += i.value;
                        }

                        registers.push({type: filterData[0].type, category: filterData[0].category, value: total});
                    }else{
                        continue;
                    }
                }

            }

            console.log(registers);
            console.log(req.params.month)
            
            res.json({registers, totalDebts, totalEntries, balance, month: req.params.month});
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
            userId: req.body.userId
        }

        const updatedRegister = await Register.findByIdAndUpdate(id, register);

        if(!updatedRegister){
            res.status(404).json({msg: 'Registro não encontrado.'});
        }

        res.status(200).json({updatedRegister, msg: 'Registro atualizado com sucesso.'});
    }
};

module.exports = registerController;