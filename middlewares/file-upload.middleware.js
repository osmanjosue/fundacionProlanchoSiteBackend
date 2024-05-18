//Created this middleware to receive one or multiple files and also to send an
//aditional property req.body.files.single = true; 
//to see wether is single or multiple files

const { response } = require('express');


const fileUploadMiddleware = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo en la peticion',
        })
    }

    //crea elemento en el req.body llamado files y guarda la informacion en 
    //un arreglo de uno si es solo un archivo y solo iguala ya que re.files.imagen es un arreglo en si

    if (!Array.isArray(req.files.imagen)) {
        req.body.files = [req.files.imagen];
    } else {
        req.body.files = req.files.imagen
    }

    next();

}

module.exports = {
    fileUploadMiddleware,
}