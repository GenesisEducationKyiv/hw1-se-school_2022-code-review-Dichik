import express from 'express'
import CoinmarketRateService from '../services/rating/coinmarketRateService'

class CoinmarketRateController {

	private rateService: CoinmarketRateService;

	constructor() {
		this.rateService = new CoinmarketRateService();
	}

	async rate(_request: express.Request, response: express.Response) {
		try {
			response.status(200).json(await this.rateService.getRate())
		} catch (error) {
			response.status(400).json({
				message: `Couldn't get rate: ${error}`,
			})
		}
	}

}

export default CoinmarketRateController;
