//Created this middleware to receive one or multiple files and also to send an
//aditional property req.body.files.single = true; 
//to see wether is single or multiple files

const { response } = require('express');


const fileUploadMiddleware = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se subio ningun archivo',
        })
    }

    if (!Array.isArray(req.files.imagen)) {
        req.body.files = [req.files.imagen];
        req.body.files.single = true;
    } else {
        req.body.files = req.files.imagen
        req.body.files.single = false;
    }

    next();

}

module.exports = {
    fileUploadMiddleware,
}