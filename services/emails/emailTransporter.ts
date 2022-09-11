import Transporter from './transporter.interface';
import nodemailer from 'nodemailer';
require('dotenv').config()

class EmailTransporter implements Transporter {

	create(): any {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'omeluan.dima@gmail.com',
				pass: 'gyhrpwdwjchaeodu'
			}
		})
		return transporter
	}

}

export default EmailTransporter;