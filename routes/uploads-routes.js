/* ruta: api/upload/articulo/:id */

const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { uploadImage, showImage } = require('../controllers/uploads-controllers');
const { fileUploadMiddleware } = require('../middlewares/file-upload.middleware')

const router = Router();

router.use(fileUpload()); //para que se habilite el req.files

router.put(
    '/:type/:id', 
    [
    validarJWT,
    fileUploadMiddleware
    ],
    uploadImage);

router.get(
    '/:type/:img', 
    [
    ],
    showImage);

module.exports = router;