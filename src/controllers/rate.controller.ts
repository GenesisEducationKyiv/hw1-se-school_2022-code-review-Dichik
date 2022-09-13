import express from 'express'
import RateProvider from '../services/rating/rateProvider.interface';
import RateService from '../services/rating/rateService';

class RateController {

	private rateService: RateService;

	constructor() {
		this.rateService = new RateService()
	}

	async rate(_request: express.Request, response: express.Response) {
		try {
			response.status(200).json(await this.rateService.rate())
		} catch (error) {
			response.status(400).json({
				message: `Couldn't get rate: ${error}`,
			})
		}
	}

}

export default RateController;
