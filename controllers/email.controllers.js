const { response } = require('express');
const { sendEmail } = require('../helpers/email.service')

const sendEmailController = async (req, res = response) => {

    const { ...emailData } = req.body;

    try {

        const emailInformation = await sendEmail(emailData).then(resp => resp);
        res.json({
            ok: true,
            msg: 'Correo enviado exitosamente',
            emailInformation
        })
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    sendEmailController
}