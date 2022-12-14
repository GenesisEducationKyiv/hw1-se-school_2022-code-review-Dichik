import express from 'express';
import { SubscriptionRepository } from '../../repositories/subscription.repository';
import { EmailEntity } from '../../models/email.entity';
import { SubscriptionProvider } from './subscriptionProvider.interface';
import { injectable, inject } from 'tsyringe';

@injectable()
export class SubscribtionService implements SubscriptionProvider {

    constructor(@inject(SubscriptionRepository) private subscriptionRepository: SubscriptionRepository) {
    }

    public async subscribe(
        request: express.Request,
        _response: express.Response
    ): Promise<EmailEntity[]> {
        if (!request.body || !request.body.email) {
            throw new Error('Body is required for request.')
        }
        const email = new EmailEntity(request.body.email)
        await this.subscriptionRepository.save(email)
        console.log(`Email: ${email.address} - was successfully saved`)
        return this.subscriptionRepository.getAll()
    }
}