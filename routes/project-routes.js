/* 
    route: /api/projects
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createProject, getProjects, editProject, deleteProject } = require('../controllers/projects-controllers');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
[],
getProjects);

router.post('/',
    [
        validarJWT,
        check('projectName', 'Es necesario el nombre del proyecto').notEmpty(),
        validarCampos
    ],
    createProject);

router.put(
    '/:id',
    [
        validarJWT,
        check('projectName', 'Es necesario el nombre del proyecto').notEmpty(),
        validarCampos
    ],
    editProject,
);

router.delete(
    '/:id',
    [
        validarJWT,
        // check('projectName', 'Es necesario el nombre del proyecto').notEmpty(),
        validarCampos
    ],
    deleteProject,
);

module.exports = router;