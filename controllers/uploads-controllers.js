const { response } = require('express');
const Article = require('../models/articles-model')
const { postImagesToDb, uploadSingle } = require('../helpers/uploadFile');
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId;


const uploadImage = async (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;
    const validTypes = ['articulos'];
    const validExt = ['png', 'jpg', 'jpeg', 'gif'];

    /* console.log(ObjectId.isValid(id));
    const regex = new RegExp(/^[0-9a-fA-F]{24}$/)
    console.log(regex.test(id)); */

    try {
        if (!validTypes.includes(type) || !ObjectId.isValid(id)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es un tipo o MongoId valido',
            })
        }


        //----------------================+++++++++++++++++++++ Helper ----------------================+++++++++++++++++++++

        const subidaArchivos = async () => {
            const article = await Article.findById(id);
            if (!article) {
                console.log('No es un id de articulo valido');
                return false;
            }
            const files = req.body.files;
            if (files.length + article.images.length <= 4) {
                const fileNames = await Promise.all(
                    files.map(file => uploadSingle(file, type, validExt, id))
                );
                return fileNames;
            } else {
                console.log('son un maximo de 4 archivos')
                return error;
            }

        }
        const fileName = await subidaArchivos();

        res.json({
            ok: true,
            msg: 'Subida Exitosa',
            fileName
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al subir las imagenes'
        })
    }


}

module.exports = {
    uploadImage,
}