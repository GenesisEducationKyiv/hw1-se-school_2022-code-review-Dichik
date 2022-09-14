import RateProvider from './rateProvider.interface';
import axios from 'axios'

class CoinbaseRateService extends RateProvider {

	constructor() {
		super();
	}

	public async getRate(from: string, to: string): Promise<string> {
		const response = await axios.get('https://api.coinbase.com/v2/prices/BTC-UAH/buy');
        return response.data.data.amount;
	}

    getType(): string {
        return 'COINBASE'
    }

}

export default CoinbaseRateService;