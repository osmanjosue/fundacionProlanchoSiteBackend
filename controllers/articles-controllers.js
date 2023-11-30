const Article = require( '../models/articles-model');

const getArticles = (req, res) => {
    res.json({
        ok: true,
        msg: 'recibir articulos'
    });
}

const createArticle = async(req, res) => {

    const { title, content, images, datecreated, category}=req.body;

    const article= new Article(req.body);
    console.log(article);
    await article.save();

    res.json({
        ok: true,
        article
    });
}

module.exports = {
    getArticles,
    createArticle
}