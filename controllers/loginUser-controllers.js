const { response } = require('express');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontEnd');

const loginUser = async (req, res = response) => {

    const { name, password } = req.body;

    try {

        const userDB = await User.findOne({ name });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no encontrado'
            })
        }

        //verify password

        const validPassword = bcrypt.compareSync(password, userDB.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida'
            })
        }

        //Generar el TOKEN - JWT
        const token = await generarJWT(userDB._id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(),
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        uid

    })

}

module.exports = {
    loginUser,
    renewToken
}