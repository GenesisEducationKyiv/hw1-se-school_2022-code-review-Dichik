import CryptoCurrencyChain from './chain/cryptoCurrencyChain'

class RateService {

    private providerChain: CryptoCurrencyChain;
    private lastFetchingResult: string;
    private lastFetchingTime: number = Date.now();
    private CACHING_TIME: number = 300000; // TODO move to env file

    constructor() {
        this.lastFetchingResult = ''
        this.providerChain = new CryptoCurrencyChain()
    }

    async rate(): Promise<string> {
        if(Date.now() - this.lastFetchingTime < this.CACHING_TIME) {
            return this.lastFetchingResult
        }
        this.lastFetchingResult = await this.providerChain.getCurrencyRate()
        this.lastFetchingTime = Date.now()
        return this.lastFetchingResult
    }

}

export default RateService