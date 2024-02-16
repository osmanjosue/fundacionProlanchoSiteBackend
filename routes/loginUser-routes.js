//path: /api/login'

const { Router } = require('express');
const { loginUser, renewToken } = require('../controllers/loginUser-controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/',
    [
        check('name', 'El nombre del usuario es requerido').notEmpty(),
        check('password', 'La contraseña es requerida para poder ingresar').notEmpty(),
        validarCampos
    ],
    loginUser)

router.get(
    '/renew',
    validarJWT,
    renewToken
    )

module.exports = router;