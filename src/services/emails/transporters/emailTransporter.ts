import Transporter from './transporter.interface';
import nodemailer from 'nodemailer';
require('dotenv').config()

class EmailTransporter implements Transporter {

	create(): any {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.SENDER_EMAIL,
				pass: process.env.EMAIL_ACCESS_TOKEN
			}
		})
		return transporter
	}

}

export default EmailTransporter;