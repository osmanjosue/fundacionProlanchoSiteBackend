const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const uploadImages = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    // validate type 
    const validTypes = ['articulos'];

    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo valido',
        })
    }
    //ya podemos usar req.files porque se instalo con 'express-fileupload'
    //validar que exista un archivo
    /* if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se subio ningun archivo',
        })
    } 20 => 25 added to the middleware file-upload.middleware.js*/

    //de aqui en delante se procesa la imagen.

    const file = req.body.files.at(0);

    const extFile = file.mimetype.split('/').at(1)

    // validate extension

    const validExt = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExt.includes(extFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo de archivo no es valido',
        })
    }

    // cambiar el nombre del archivo

    const fileName = `${uuidv4()}.${extFile}`

    //Crear la ruta donde se guardara el archivo

    const path = `./uploads/${type}/${fileName}`;

    //file es el de la linea 29 const file = req.files.imagen;
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }

        res.json({
            ok: true,
            msg: 'Archivo subido',
            fileName,
        })
    });
}

module.exports = {
    uploadImages,
}