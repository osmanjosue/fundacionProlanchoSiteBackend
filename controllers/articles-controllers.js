const { response } = require('express');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const Article = require('../models/articles-model');
const { borrarImagenCarpetaLocal } = require('../helpers/updateOrDeleteFiles');
const { cloudinaryDelete } = require('../helpers/cloudinary');

const getArticles = async (req, res = response) => {

    const article = await Article.find({}, 'userId title content images dateCreated dateAssigned published project category');

    res.json({
        ok: true,
        article
    });
}

const createArticle = async (req, res = response) => {

    /* const { title, content, images, datecreated, category } = req.body; */
    //req.uid viene del middleware validar-jwt.js
    const article = new Article({
        userId: req.uid,
        ...req.body
    });
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

const actualizarArticulo = async (req, res=response) => {
    const articleId = req.params.id;
    try {

        if (ObjectId.isValid(articleId)) {
            const articleDb = await Article.findById(articleId);
            if (!articleDb) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un articulo por ese id'
                })
            } else {

                //desestructuramos lo que permitimos actualizar
                const {userId, images, dateCreated, project, category, ...campos} = req.body;
                await Article.findByIdAndUpdate(articleId, campos, {new: true});

                //proba enviar solo un campo y no campos (todos), para ver si podes actualizar solo las imagenes
                //individual
                
                /* AQUI IRIA LA ACTUALIZACION DE IMAGENES
                articleDb
                .images
                .map(file => {
                    cloudinaryFile=file.split('.').at(0);
                    console.log(cloudinaryFile)
                    borrarImagenCarpetaLocal(`uploads/articulos/${file}`);
                    cloudinaryDelete(`uploads/${cloudinaryFile}`);
                }); */

                return res.status(200).json({
                    ok: true,
                    msg: 'Articulo Actualizado Correctamente',
                });
            }
        } else {
            return res.status(400).json({
                ok: true,
                msg: 'No es un MongoId valido',
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el Articulo',
        });
    }
}

const deleteArticle = async (req, res) => {
    const articleId = req.params.id;
    try {

        if (ObjectId.isValid(articleId)) {
            const articleDb = await Article.findById(articleId);
            if (!articleDb) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un articulo por ese id'
                })
            } else {
                await Article.findByIdAndDelete(articleId);
                
                articleDb
                .images
                .map(file => {
                    cloudinaryFile=file.split('.').at(0);
                    console.log(cloudinaryFile)
                    borrarImagenCarpetaLocal(`uploads/articulos/${file}`);
                    cloudinaryDelete(`uploads/${cloudinaryFile}`);
                });

                return res.status(200).json({
                    ok: true,
                    msg: 'Articulo Eliminado Correctamente',
                });
            }
        } else {
            return res.status(400).json({
                ok: true,
                msg: 'No es un MongoId valido',
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar el Articulo',
        });
    }
}

// TODO: make the delete and update controllers

module.exports = {
    getArticles,
    createArticle,
    actualizarArticulo,
    deleteArticle,
}