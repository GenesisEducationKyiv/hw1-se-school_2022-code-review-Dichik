import express from 'express'
import SubscriptionRepository from '../../repositories/subscriptionRepository'

class SubscribtionService {

	private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository()
	}

	public async subscribe(request: express.Request, response: express.Response): Promise<string[]> {
		if (!request.body || !request.body.email) {
			throw new Error('Body is required for request.')
		}
		const email = request.body.email
		try {
			await this.subscriptionRepository.save(email)
			console.log(`Email: ${email} - was successfully saved`)
			return this.subscriptionRepository.getAll()
		} catch(error) {
			console.log('Couldn\'t save your email, error: ' + error)
			throw new Error(error as string)
		}
	}

}

export default SubscribtionService;