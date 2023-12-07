const { response } = require('express');
const User = require('../models/user-model');

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