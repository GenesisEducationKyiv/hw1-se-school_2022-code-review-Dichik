import express from 'express'
import { SendEmailError } from '../services/emails/senders/exceptions/sendEmail.error';

import SendEmailsService from '../services/emails/senders/sendEmails.service'

class EmailController {

	private emailService: SendEmailsService;

	constructor() {
		this.emailService = new SendEmailsService()
	}

	async sendEmails(_request: express.Request, response: express.Response) {
		try {
			response.status(200).json(await this.emailService.sendBulk())
		} catch (error) {
			if(error instanceof SendEmailError) {
				response.status(400).json({
					message: `Couldn't send emails: ${error}`,
				})
			} else {
				response.status(500).json({
					message: `Invalid error: ${error}`,
				})
			}
		}
	}
	
}

export default EmailController;