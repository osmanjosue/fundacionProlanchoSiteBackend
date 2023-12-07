/*
users
 ruta: '/api/users' 
 */
const { Router }= require( 'express' );
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

/* const {getArticles, createArticle} = require( '../controllers/articles-controllers' ); */
const {getUsers, createUser} = require('../controllers/users-controllers')

const router = Router();

router.get('/', getUsers );

router.post('/',
[
    check('name', 'hace falta el nombre del usuario').notEmpty(),
    check('password', 'Es necesaria una contraseña').notEmpty(),
    // check('role', 'No sabemos si es admin o user').notEmpty(),  //quitamos esta validacion porque en el modelo viene un valor default: "USER_ROLE"
    validarCampos,

]
 ,createUser);


module.exports = router;