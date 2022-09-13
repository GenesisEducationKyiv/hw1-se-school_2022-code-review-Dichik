import express from 'express'
import SubscriptionRepository from '../../repositories/subscriptionRepository'

class SubscribtionService {

	private subscriptionRepository: SubscriptionRepository;

	constructor() {
		this.subscriptionRepository = new SubscriptionRepository()
	}

	public async subscribe(request: express.Request, _response: express.Response): Promise<string[]> {
		if (!request.body || !request.body.email) {
			throw Error('Body is required for request.')
		}
		const email = request.body.email
		try {
			this.subscriptionRepository.save(email)
			console.log(`Email: ${email} - was successfully saved`)
			return this.subscriptionRepository.getAll()
		} catch(error) {
			console.log('Couldn\'t save your email, error: ' + error)
			throw Error(error as string)
		}
	}

	public async unsubscribe(emails: Array<string>): Promise<string[]> {
		try {
			const result = await this.subscriptionRepository.bulkDelete(emails)
			console.log('Emails were deleted successfully')
			return result
		} catch(error) {
			console.log(error)
			throw Error(error as string)
		}
	}

}

export default SubscribtionService;