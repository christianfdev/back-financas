const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const conn = require('./db/conn');
const routes = require('./routes/router');

app.use(cors());

app.use(express.json());

conn();

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
})