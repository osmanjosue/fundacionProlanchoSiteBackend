const fs = require('fs');

const borrarImagenCarpetaLocal = async ( path ) => {   

    if (fs.existsSync(path)){
        //borrar la imagen anterior
        fs.unlinkSync(path);
        return true;
    }

}

module.exports = {
    borrarImagenCarpetaLocal
}