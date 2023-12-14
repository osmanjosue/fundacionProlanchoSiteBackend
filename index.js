require ('dotenv').config();
const express = require ('express');
const cors = require('cors');

const { dbConnection } = require('./database/config')

const app = express(); //creates express server
app.use( cors() );// cors configuration
app.use( express.json() ) // para leer el body, sin esto no funcionaria el post

dbConnection(); //database conexion

//routes starts
app.use('/api/login', require('./routes/loginUser-routes'));
app.use( '/api/articles', require('./routes/articles-routes'));
app.use( '/api/users', require('./routes/user-routes'));
app.use( '/api/projects', require ('./routes/project-routes'));
//routes Ends

app.listen(process.env.PORT, ()=>{
    console.log(('servidor corriendo en puerto ' + process.env.PORT));
})