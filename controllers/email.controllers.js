const { response } = require('express');
const {sendEmail} = require('../helpers/email.service')

const sendEmailController = async (req, res = response) => {

    const { ...emailData } = req.body;

    try {

        sendEmail(emailData)
        console.log('se pudo')
        res.json({
            ok: true,
            msg: 'Correo enviado exitosamente'
        })
    } catch (error) {
        console.log('no se pudo')
    }

}

module.exports = {
    sendEmailController
}