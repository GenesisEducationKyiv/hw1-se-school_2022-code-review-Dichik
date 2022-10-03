import express from 'express'
import { autoInjectable } from 'tsyringe'
import { SendEmailError } from '../services/senders/exceptions/sendEmail.error'
import { SendEmailService } from '../services/senders/sendEmails.service'

@autoInjectable()
export class EmailController {
    private emailService: SendEmailService;

    constructor(emailService: SendEmailService) {
        this.emailService = emailService;
    }

    async sendEmails(_request: express.Request, response: express.Response) {
        try {
            await this.emailService.sendBulk();
            response.status(200).json({
                message: `All emails were sent successfully!`
            });
        } catch (error) {
            this.handleSendingEmailsError(error, response);
        }
    }

    private handleSendingEmailsError(error: any, response: express.Response) {
        if (error instanceof SendEmailError) {
            response.status(400).json({
                message: `Couldn't send emails: ${error}`,
            });
        } else {
            response.status(500).json({
                message: `Invalid error: ${error}`,
            });
        }
    }
}