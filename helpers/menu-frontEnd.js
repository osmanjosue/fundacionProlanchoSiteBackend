const getMenuFrontEnd = () => {

    const menu = [
        { title: 'Inicio', url: 'inicio', icono: 'fa-solid fa-house' },
        { title: 'Noticias', url: 'noticias', icono: 'fa-solid fa-newspaper' },
        { title: 'Quienes Somos', url: 'nosotros', icono: 'fa-solid fa-users-rectangle' },
        { title: 'Contactanos', url: 'contacto', icono: 'fa-regular fa-address-card' },
        { title: 'Crear Articulo', url: 'nuevoArticulo', icono: 'fa-regular fa-square-plus' },
        { title: 'Subir Imagenes', url: 'uploadImages', icono: 'fa-regular fa-image' },
    ];
    return menu;;

}

module.exports = {
    getMenuFrontEnd,
}