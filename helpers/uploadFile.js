/* Created this helper to reutilize it multiple times and be able
to upload multiple files with the uploadSingle function only */

const Article = require('../models/articles-model')
const { v4: uuidv4 } = require('uuid');
const cloudinaryUpload = require('./cloudinary');



const postImagesToDb = async (type, id, fileName) => {

    const article = await Article.findById(id);
    if (!article.images.includes(fileName)) {
        console.log('Imagen salvada con exito');
        article.images.push(fileName)
        await article.save();
        return true;
    } else {
        return false
    };
}

const uploadSingle = async (file, type, validExtensions, id) => {

    try {
        const extFile = file.mimetype.split('/').at(1);
        const fileName = `${uuidv4()}.${extFile}`;
        const path = `uploads/${type}/${fileName}`;

        if (!validExtensions.includes(extFile)) {
            return console.log('No es un tipo de extension valido')
        }

        const continueUploading = await postImagesToDb(type, id, fileName);

        /* TODO: este filename tiene que poder recibirse en los headers */
        if (continueUploading) {
            await file.mv(path);
            await cloudinaryUpload(path);
            return { fileName };
        } else {
            return false;
        }

    } catch (error) {

        console.log(error);
    }
}

module.exports = {
    uploadSingle,
}