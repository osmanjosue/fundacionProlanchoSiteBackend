/* Created this helper to reutilize it multiple times and be able
to upload multiple files with the uploadSingle function only */

const Article = require('../models/articles-model')
const { v4: uuidv4 } = require('uuid');
const { cloudinaryUpload } = require('./cloudinary');

const uploadSingle = async (file, type, validExtensions, article) => {

    try {
        const extFile = file.mimetype.split('/').at(1);

        if (!validExtensions.includes(extFile)) {
            return console.log('No es un tipo de extension valido')
        }

        const fileName = `${uuidv4()}.${extFile}`;
        const path = `uploads/${type}/${fileName}`;



        await file.mv(path)                        //mueve el archivo al directorio
            .then(await cloudinaryUpload(path));   //guarda el archivo del directorio en cloudinary
        article.images.push(fileName)              // agrega la imagen al array del evento
        await article.save()                       // salva el evento entero
        return fileName;

        /* TODO: este filename tiene que poder recibirse en los headers */

    } catch (error) {

        throw new Error(error);
    }
}

module.exports = {
    uploadSingle,
}