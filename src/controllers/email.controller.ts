import express from 'express'

import SendEmailsService from '../services/emails/senders/sendEmailsService'

class EmailController {

	private emailService: SendEmailsService;

	constructor() {
		this.emailService = new SendEmailsService()
	}

	async sendEmails(_request: express.Request, response: express.Response) {
		try {
			response.status(200).json(await this.emailService.sendBulk())
		} catch (error) {
			response.status(400).json({
				message: `Couldn't send emails: ${error}`,
			})
		}
	}
	
}

export default EmailController;