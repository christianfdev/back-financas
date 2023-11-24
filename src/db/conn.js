const mongoose = require('mongoose');

async function main() {

    try {

        await mongoose.connect("mongodb+srv://devchristianfarias:SZotxPtGhDlR0D2J@cluster0.ywhbop4.mongodb.net/?retryWrites=true&w=majority")
    
        console.log('Conectado ao banco!')
    } catch (error) {
        console.log(`Erro: ${erro}`);
    }
}

module.exports = main;