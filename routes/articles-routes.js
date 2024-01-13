/* 
    route: /api/articles
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getArticles,
    createArticle,
    deleteArticle,
    actualizarArticulo
} = require('../controllers/articles-controllers');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getArticles);

router.post('/',
    [
        validarJWT,
        check('title', 'El titulo es necesario').notEmpty(),
        check('content', 'El contenido del articulo es necesario').notEmpty(),
        /* check('images', 'Por lo menos se necesita una imagen').notEmpty(), */
        check('dateCreated', 'La fecha de creacion es necesaria').notEmpty(),
        check('dateAssigned', 'La fecha de publicacion es necesaria').notEmpty(),
        check('published', 'Es necesario saber si se publica o no').notEmpty(),
        validarCampos,
    ]
    , createArticle);

router.put(
    '/:id',
    [
        validarJWT
    ],
    actualizarArticulo
);

router.delete(
    '/:id',
    [
        validarJWT,
    ],
    deleteArticle,
);

module.exports = router;