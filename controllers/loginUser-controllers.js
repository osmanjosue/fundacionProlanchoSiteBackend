const { response }=require('express');
const User = require('../models/user-model');
const bcrypt = require ('bcryptjs');

const loginUser = async(req, res=response) => {

    const {name, password} = req.body;

    try {

        const userDB= await User.findOne({name});
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'usuario no encontrado'
            })
        }

        //verify password

        const validPassword = bcrypt.compareSync( password, userDB.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida'
            })
        }

        //Generar el TOKEN - JWT

        res.json({
            ok: true,
            msg: 'Todo de a pijita'
        })



    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    loginUser,
}