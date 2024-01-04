const { response } = require('express');


const fileUploadMiddleware = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se subio ningun archivo',
        })
    }

    if (!Array.isArray(req.files.imagen)) {
        req.body.files = [req.files.imagen]
    } else {
        req.body.files = req.files.imagen
    }

    next();

}

module.exports = {
    fileUploadMiddleware,
}