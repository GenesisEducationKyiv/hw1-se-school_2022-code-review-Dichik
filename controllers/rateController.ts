import express from 'express'
import CoinmarketRateService from '../services/rating/coinmarketRateService'

export const rate = async (request: express.Request, response: express.Response) => {
	let coinmarketRateService = new CoinmarketRateService()
	try {
		response.status(200).json(await coinmarketRateService.getRate())
	} catch (error) {
		response.status(400).json({
			message: `Couldn't get rate: ${error}`,
		})
	}
}

// class RateController {

// 	// rate()

// }

// export default RateController;