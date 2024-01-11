

const { v2: cloudinary } = require('cloudinary');
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
        await cloudinary.uploader
            .upload(path, options)
            .then(result => console.log(result.secure_url))
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