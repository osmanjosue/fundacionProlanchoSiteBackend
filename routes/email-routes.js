const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { sendEmailController } = require("../controllers/email.controllers");

const router = Router();

router.post('/',
    [
        check('to', 'El destinatario es necesario').notEmpty().isEmail(),
        check('replyTo', 'El correo de contacto es obligatorio').notEmpty().isEmail(),
        check('subject', 'El subject es necesario').notEmpty(),
        check('html', 'El cuerpo html es necesario').notEmpty(),
        validarCampos,
    ],
    sendEmailController,
);

module.exports = router;