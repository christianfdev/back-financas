require("dotenv").config()
const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

async function main() {

    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ywhbop4.mongodb.net/?retryWrites=true&w=majority`)
    
        console.log('Conectado ao banco!');
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;