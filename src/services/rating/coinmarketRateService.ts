
const Coinmarketcap = require('coinmarketcap-api');
import RateConfig from './rateConfig.interface';
require('dotenv').config()

class CoinmarketRateService implements RateConfig {

	private key: string;
	private client: any;

	constructor() {
		this.key = process.env.COINMARKET_API_KEY as string
		this.client = new Coinmarketcap(this.key)
	}

	public async getRate(from: string = 'BTC', to: string = 'UAH'): Promise<string> {
		return await this.client
			.getQuotes({ symbol: from, convert: to })
			.then((response: any) => response.data.BTC.quote.UAH.price) // BTC -> UAH if we add something???
			.catch((error: any) => console.log(error))
	}

}

export default CoinmarketRateService;