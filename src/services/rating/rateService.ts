import CoinbaseRateService from "./coinbaseRateService";
import CoinmarketRateService from "./coinmarketRateService";
import RateProvider from "./rateProvider.interface"

class RateService {

    private rateProvider: RateProvider;
    private lastFetchingResult: string;
    private lastFetchingTime: number = Date.now();
    private CACHING_TIME: number = 300000; // TODO move to env file

    constructor() {
        let config: string = process.env.CRYPTO_CURRENCY_PROVIDER as string
        this.lastFetchingResult = ''

        if(config === 'coinmarket') {
            this.rateProvider = new CoinmarketRateService()
        } else if(config === 'coinbase') {
            this.rateProvider = new CoinbaseRateService()
        } else {
            throw Error('You are using wrong provider. Please fix it in .env file...')
        }
    }

    async rate(): Promise<string> {
        if(Date.now() - this.lastFetchingTime < this.CACHING_TIME) {
            return this.lastFetchingResult
        }
        this.lastFetchingResult = await this.rateProvider.getRate('BTC', 'UAH')
        this.lastFetchingTime = Date.now()
        return this.lastFetchingResult
    }

}

export default RateService