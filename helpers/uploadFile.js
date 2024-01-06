/* Created this helper to reutilize it multiple times and be able
to upload multiple files with the uploadSingle function only */

const { v4: uuidv4 } = require('uuid');

/* ----------- Cloudinary Seccion Start ----------- */

const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

/* ----------- Cloudinary Seccion End ----------- */

const uploadSingle = (file, folder, validExtensions) => {

    const extFile = file.mimetype.split('/').at(1);

    if (!validExtensions.includes(extFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo de archivo no es valido',
        })
    }

    const fileName = `${uuidv4()}.${extFile}`;
    const path = `${folder}/${fileName}`;

    file.mv(path, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }
        /* ----------- Cloudinary Seccion Start ----------- */
        // Use the uploaded file's name as the asset's public ID and 
        // allow overwriting the asset with new versions
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            folder: 'uploads',
        };
        await cloudinary.uploader
            .upload(path, options)
            .then(result => console.log(result.secure_url))
        /* ----------- Cloudinary Seccion End ----------- */
    });

    return { fileName };

}

module.exports = {
    uploadSingle,
}