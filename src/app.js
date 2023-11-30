const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const conn = require('./db/conn');
const routes = require('./routes/router');


app.use(cors());

app.use(express.json());

app.use('/api', routes);


try {
    conn();
    app.listen(port, () => {
        console.log(`API Gerenciador Finanças rodando na porta ${port}`)
    })
} catch (error) {
    console.log(error)
}





