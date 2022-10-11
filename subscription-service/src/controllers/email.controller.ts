import express from 'express';
import { inject, injectable } from 'tsyringe';
import { SendEmailError } from '../services/senders/exceptions/sendEmail.error';
import { SendEmailService } from '../services/senders/sendEmails.service';
import { producer } from '../../../rabbitmq/init';

@injectable()
export class EmailController {

    constructor(@inject(SendEmailService) private emailService: SendEmailService) {
    }

    async sendEmails(_request: express.Request, response: express.Response) {
        try {
            await this.emailService.sendBulk();
            const message: string = `All emails were sent successfully!`;
            producer.publish(message);
            response.status(200).json({
                message: message
            });
        } catch (error) {
            this.handleSendingEmailsError(error, response);
        }
    }

    private handleSendingEmailsError(error: any, response: express.Response) {
        var message: string;
        if (error instanceof SendEmailError) {
            message = `Couldn't send emails: ${error}`;
            response.status(400).json({
                message: message
            });
        } else {
            message = `Invalid error: ${error}`;
            response.status(500).json({
                message: `Invalid error: ${error}`
            });
        }
        producer.publish(message);
    }
}