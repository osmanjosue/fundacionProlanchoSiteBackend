//path: /api/login'

const { Router }= require( 'express' );
const { loginUser } = require('../controllers/loginUser-controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/',
[
    check('name', 'El nombre del usuario es requerido').notEmpty(),
    check('password', 'La contraseña es requerida para poder ingresar').notEmpty(),
    validarCampos
],
loginUser)

module.exports = router;