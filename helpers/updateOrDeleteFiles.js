const fs = require('fs');

const borrarImagenCarpetaLocal = ( path ) => {   

    if (fs.existsSync(path)){
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }

}

module.exports = {
    borrarImagenCarpetaLocal
}