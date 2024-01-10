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


const cloudinaryUpload = async (path) => {

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

}

module.exports = cloudinaryUpload;