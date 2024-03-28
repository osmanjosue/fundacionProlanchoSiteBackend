const {response}=require('express');

const curriculoUploadMiddleware = (req, res=response, next) => {
    if(!req.files || Object.keys(req.files).length===0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se subio ningun archivo (curriculum)'
        })
    } else {
        req.body.files = req.files.curriculo
    }
    
    next();
}

module.exports = {
    curriculoUploadMiddleware
}