/* 
    route: /api/articles
*/
const { Router }= require( 'express' );
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const {getArticles, createArticle} = require( '../controllers/articles-controllers' );

const router = Router();

router.get('/', getArticles );

router.post('/',
[
    check('title', 'El titulo es necesario').notEmpty(),
    check('content', 'El contenido del articulo es necesario').notEmpty(),
    check('images', 'Por lo menos se necesita una imagen').notEmpty(),    
    check('dateCreated', 'La fecha de publicacion es necesaria').notEmpty(),  
    validarCampos,  
]
 ,createArticle);


module.exports = router;