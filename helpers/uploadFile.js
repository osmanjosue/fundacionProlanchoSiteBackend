const { v4: uuidv4 } = require('uuid');

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

    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }
    });
    return { fileName };    

}

module.exports = {
    uploadSingle,
}