

const { v2: cloudinary } = require('cloudinary');
const { borrarImagenCarpetaLocal } = require('./updateOrDeleteFiles');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: 'uploads',
};

const cloudinaryUpload = async (path) => {

    /* ----------- Cloudinary Seccion Start ----------- */
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions        
    try {
        const result = await cloudinary.uploader
            .upload(path, options);
        await borrarImagenCarpetaLocal(path)
        return result.secure_url;
    }
    catch (err) {
        await borrarImagenCarpetaLocal(path)
        throw new Error(JSON.stringify(err))
    }
    /* ----------- Cloudinary Seccion End ----------- */

}

const cloudinaryDelete = async (path) => {
    cloudinary.uploader.destroy(path)
        .then(result => console.log(result))
        ;
}

module.exports = {
    cloudinaryUpload,
    cloudinaryDelete,
};