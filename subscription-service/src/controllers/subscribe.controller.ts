import express from 'express'
import { autoInjectable } from 'tsyringe';
import { ExistedEmailError } from '../services/subscriptions/exceptions/existedEmail.error'
import { InvalidEmailError } from '../services/subscriptions/exceptions/invalidEmail.error'
import { SubscribtionService } from '../services/subscriptions/subscription.service'

@autoInjectable()
export class SubscriptionController {
    private subscriptionService: SubscribtionService;

    constructor(subscriptionService: SubscribtionService) {
        this.subscriptionService = subscriptionService;
    }

    async subscribe(request: express.Request, response: express.Response) {
        try {
            const emails = await this.subscriptionService.subscribe(
                request,
                response
            )
            return response.status(201).json({ data: emails });
        } catch (error) {
            this.handleSubscriptionError(error, response);
        }
    }

    private handleSubscriptionError(error: any, response: express.Response) {
        if (error instanceof InvalidEmailError) {
            response.status(400).json({
                message: `Couldn't subcribe: ${error}`,
            });
        } else if (error instanceof ExistedEmailError) {
            response.status(409).json({
                message: `Couldn't subcribe: ${error}`,
            });
        } else {
            response.status(500).json({
                message: `Invalid error: ${error}`,
            });
        }
    }
}