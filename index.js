require ('dotenv').config();
const express = require ('express');
const cors = require('cors');

const { dbConnection } = require('./database/config')

const app = express();
app.use( cors() );
app.use( express.json() ) // para leer el body, sin esto no funcionaria el post

dbConnection();

app.use( '/api/articles', require('./routes/articles-routes'))

app.listen(process.env.PORT, ()=>{
    console.log(('servidor corriendo en puerto ' + process.env.PORT));
})