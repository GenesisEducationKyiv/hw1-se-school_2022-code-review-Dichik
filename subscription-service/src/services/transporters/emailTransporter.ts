import Transporter from './transporter.interface'
import nodemailer from 'nodemailer'

class NodeMailer implements Transporter {
    private mailer: any

    constructor() {
        this.mailer = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.EMAIL_ACCESS_TOKEN,
            },
        })
    }

    async send(mailOptions: any): Promise<void> {
        await this.mailer.sendMail(
            mailOptions,
            function (error: any, info: { response: string }) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            }
        )
    }
}

export default NodeMailer
