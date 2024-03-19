/* import nodemailer from 'nodemailer';
require('dotenv').config();

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE,
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_SECRE_KEY,
        }
    })

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            })
            console.log(sentInformation);
            return true;
        } catch (error) {
            return false;
        }

    }

} */