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

    const { to, subject, htmlBody } = options;

    try {
        const sentInformation = await transporter.sendMail({
            to: to,
            subject: subject,
            html: htmlBody,
        })
        console.log(sentInformation);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }

}

module.exports = {
    sendEmail
}