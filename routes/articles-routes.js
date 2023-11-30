/* 
    route: /api/articles
*/
const { Router }= require( 'express' );
const {getArticles, createArticle} = require( '../controllers/articles-controllers' );

const router = Router();

router.get('/', getArticles );

router.post('/', createArticle);


module.exports = router;