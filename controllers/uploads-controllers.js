const { response } = require('express');

//helper that uploads the images
const { uploadSingle } = require('../helpers/uploadFile');

const uploadImage = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;
    const validTypes = ['articulos'];

    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo valido',
        })
    }

    const validExt = ['png', 'jpg', 'jpeg', 'gif'];
    
    //----------------================+++++++++++++++++++++ Helper ----------------================+++++++++++++++++++++
    
    const subidaArchivos = async () => {
        
        if (req.body.files.single) {
            const file = req.body.files.at(0);
            return uploadSingle(file, `uploads/${type}`, validExt);
        } else {
            const files= req.body.files;
            const fileNames = await Promise.all(
                files.map(file => uploadSingle(file, `uploads/${type}`, validExt))
                );
                return fileNames;                
            }            
        }        
        subidaArchivos().then(val => console.log(val));

    res.json({
        ok: true,
        msg: 'Subida Exitosa',
    })
}

module.exports = {
    uploadImage,
}