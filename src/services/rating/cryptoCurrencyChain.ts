import RateProvider from "./rateProvider";

class CryptoCurrencyChain {

    private cryptoCurrencyProvider: RateProvider;

    constructor(rateProvider: RateProvider) {
        this.cryptoCurrencyProvider = rateProvider;
    }

    // async getCurrencyRate(): Promise<string> {
    //     try {
    //         return await this.cryptoCurrencyProvider.getRate('BTC', 'UAH')
    //     } catch(error) {
    //         console.log(`${this.cryptoCurrencyProvider.getType()} error: ` + error)
    //         return await this.cryptoCurrencyProvider.getRate()
    //     }
    // }

}

export default CryptoCurrencyChain;