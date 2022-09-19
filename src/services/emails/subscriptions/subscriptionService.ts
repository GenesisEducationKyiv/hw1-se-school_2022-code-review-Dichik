import express, { response } from 'express'
import SubscriptionRepository from '../../../repositories/subscriptionRepository'
import EmailEntity from '../models/email.entity';
import SubscriptionProvider from './subscriptionProvider.interface';

class SubscribtionService implements SubscriptionProvider {

	private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository()
	}

	public async subscribe(request: express.Request, _response: express.Response): Promise<EmailEntity[]> {
		if (!request.body || !request.body.email) {
			throw new Error('Body is required for request.')
		}
		const email = new EmailEntity(request.body.email)
		await this.subscriptionRepository.save(email)
		console.log(`Email: ${email} - was successfully saved`)
		return this.subscriptionRepository.getAll()
	}

}

export default SubscribtionService;