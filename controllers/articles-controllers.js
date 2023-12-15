const { response } = require('express');
const Article = require('../models/articles-model');

const getArticles = async (req, res=response) => {


    console.log({ Article });
    const article = await Article.find({}, 'userId title content images dateCreated dateAssigned published project category');

    res.json({
        ok: true,
        article
    });
}

const createArticle = async (req, res = response) => {

    /* const { title, content, images, datecreated, category } = req.body; */
    const article = new Article({
        userId: req.uid,
        ...req.body});
    try {
        await article.save();

        res.json({
            ok: true,
            article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

module.exports = {
    getArticles,
    createArticle
}