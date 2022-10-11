import express from 'express';
import { inject, injectable } from 'tsyringe';
import { ExistedEmailError } from '../services/subscriptions/exceptions/existedEmail.error';
import { InvalidEmailError } from '../services/subscriptions/exceptions/invalidEmail.error';
import { SubscribtionService } from '../services/subscriptions/subscription.service';
import { rabbitProducer } from '../../../rabbitmq/init';

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
            rabbitProducer.produce(`Emails were sent [${emails}]`);
            return response.status(201).json({ data: emails });
        } catch (error) {
            this.handleSubscriptionError(error, response);
        }
    }

    private handleSubscriptionError(error: any, response: express.Response) {
        if (error instanceof InvalidEmailError) {
            const message: string = `Couldn't subcribe: ${error}`;
            rabbitProducer.produce(message);
            response.status(400).json({
                message: message,
            });
        } else if (error instanceof ExistedEmailError) {
            const message: string = `Couldn't subcribe: ${error}`;
            rabbitProducer.produce(message);
            response.status(409).json({
                message: message,
            });
        } else {
            const message: string = `Invalid error: ${error}`;
            rabbitProducer.produce(message);
            response.status(500).json({
                message: message,
            });
        }
    }
}