const nodemailer = require('nodemailer')
require('dotenv').config();

/* interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
} */

const transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_SECRET_KEY,
    }
})

const sendEmail = async (options) => {

    const {to, replyTo, subject, html } = options;

    try {
        const sentInformation = await transporter.sendMail({
            from: `fundacionprolancho.org <test@gmail.com>`,
            to: to,
            replyTo: replyTo,
            subject: subject,
            html: html,
        })
        /* console.log(sentInformation); */
        return sentInformation;
    } catch (error) {
        console.log(error)
        return false;
    }

}

module.exports = {
    sendEmail
}