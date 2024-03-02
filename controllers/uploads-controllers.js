const { response } = require('express');
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId;
const path = require('path');

const Article = require('../models/articles-model')
const { uploadSingle } = require('../helpers/uploadFile');
const { Error } = require('mongoose');
const { error } = require('console');


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
                return error;
            }
            const files = req.body.files;
            if (files.length + article.images.length <= 10) {
                const fileNames = await Promise.all(
                    files.map(file => uploadSingle(file, type, validExt, id))
                );
                return fileNames;
            } else {
                throw new Error('son un maximo de 10 archivos');
            }

        }

        //----------------================+++++++++++++++++++++ Helper ----------------================+++++++++++++++++++++

        const fileName = subidaArchivos();

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

const showImage = (req, res = response) => {

    const type = req.params.type;
    const img = req.params.img;

    /* importado al inicio --const path = require('path');-- */

    const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);
    /* const pathImg = `https://res.cloudinary.com/dnmiw6q44/image/upload/v1705031852/uploads/${img}`; */
    console.log(pathImg)

    res.sendFile(pathImg);

    /* Estamos en clase 141*/

    //FALTA MOSTRAR LA IMAGEN PREDETERMINADA EN CASO QUE NO HAYA UNA
}

module.exports = {
    uploadImage,
    showImage,
}