import CoinmarketRateService from "./coinmarketRateService";
import RateProvider from "./rateProvider.interface"

class RateService {

    private rateProvider: RateProvider;

    constructor() {
        let config: string = process.env.CRYPTO_CURRENCY_PROVIDER as string

        if(config === 'coinmarket') {
            this.rateProvider = new CoinmarketRateService()
        } else {
            throw Error('You are using wrong provider. Please fix it in .env file...')
        }
    }

    async rate(): Promise<string> {
        return await this.rateProvider.getRate('BTC', 'UAH')
    }

}

export default RateService