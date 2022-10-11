import express from 'express';
import { inject, injectable } from 'tsyringe';
import { ExistedEmailError } from '../services/subscriptions/exceptions/existedEmail.error';
import { InvalidEmailError } from '../services/subscriptions/exceptions/invalidEmail.error';
import { SubscribtionService } from '../services/subscriptions/subscription.service';
import { producer } from '../../../rabbitmq/init';

@injectable()
export class SubscriptionController {

    constructor(@inject(SubscribtionService) private subscriptionService: SubscribtionService) {
    }

    async subscribe(request: express.Request, response: express.Response) {
        try {
            const emails = await this.subscriptionService.subscribe(
                request,
                response
            )
            producer.publish(`Emails were sent [${emails}]`);
            return response.status(201).json({ data: emails });
        } catch (error) {
            this.handleSubscriptionError(error, response);
        }
    }

    private handleSubscriptionError(error: any, response: express.Response) {
        var message: string;
        if (error instanceof InvalidEmailError) {
            message = `Couldn't subcribe: ${error}`;
            response.status(400).json({
                message: message,
            });
        } else if (error instanceof ExistedEmailError) {
            message = `Couldn't subcribe: ${error}`;
            response.status(409).json({
                message: message,
            });
        } else {
            message = `Invalid error: ${error}`;
            response.status(500).json({
                message: message,
            });
        }
        producer.publish(message);
    }
}