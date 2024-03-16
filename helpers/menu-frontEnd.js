const getMenuFrontEnd = () => {

    const menu = [
        { title: 'Inicio', url: 'inicio', icono: 'fa-solid fa-house' },
        { title: 'Noticias', url: 'noticias', icono: 'fa-solid fa-newspaper' },
        /* { title: 'Proyectos', url: 'proyectos', icono: 'fa-solid fa-diagram-project' }, */
        { title: 'Quienes Somos', url: 'nosotros', icono: 'fa-solid fa-users-rectangle' },/* 
        { title: 'Contactanos', url: 'contacto', icono: 'fa-regular fa-address-card' }, */
        { title: 'Crear/Editar/Borrar Noticia', url: 'nuevoArticulo', icono: 'fa-regular fa-square-plus' },
        { title: 'Imagenes', url: 'images', icono: 'fa-regular fa-image' },
        {title: 'Colaboradores Del Sitio', url: 'developers', icono: 'fa-solid fa-laptop-code'},
    ];
    return menu;;

}

module.exports = {
    getMenuFrontEnd,
}