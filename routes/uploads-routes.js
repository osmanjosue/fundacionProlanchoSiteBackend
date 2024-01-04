/* ruta: api/upload/articulo/:id */

const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { uploadImages } = require('../controllers/uploads-controllers');
const { fileUploadMiddleware } = require('../middlewares/file-upload.middleware')

const router = Router();

router.use(fileUpload());
router.use(fileUploadMiddleware);

router.put('/:type/:id', validarJWT, uploadImages);

module.exports = router;