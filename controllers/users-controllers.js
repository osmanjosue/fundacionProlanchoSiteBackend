const { response } = require('express');
const User = require('../models/user-model');
const bcrypt = require ('bcryptjs');

const getUsers = async (req, res = response) => {

    console.log({User});

    const user = await User.find({}, 'name password role')

    res.json ({
        ok: true, 
        user
    })

}

const createUser = async (req, res = response) => {
    try{

        const user = new User(req.body);

        //password encryption

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt); //pudiste haber desestructurado al inicio pero usar el mismo user.password no parece estar mal

        await user.save();

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en usuarios... revisar logs'
        })
    }
}



module.exports = {
    getUsers,
    createUser
}