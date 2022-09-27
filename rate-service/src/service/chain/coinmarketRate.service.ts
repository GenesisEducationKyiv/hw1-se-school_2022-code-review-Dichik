const Coinmarketcap = require('coinmarketcap-api')
import ProviderChain from './providerChain.interface'

class CoinmarketRateChain implements ProviderChain {
    private key: string
    private client: any
    private nextChain: ProviderChain

    constructor() {
        this.key = process.env.COINMARKET_API_KEY as string
        this.client = new Coinmarketcap(this.key)
    }

    setNext(nextChain: ProviderChain): void {
        this.nextChain = nextChain
    }

    async getCurrencyRate(from: string, to: string): Promise<string> {
        try {
            const result = await this.client
                .getQuotes({ symbol: from, convert: to })
                .then((response: any) => response.data.BTC.quote.UAH.price) // BTC -> UAH if we add something???
                .catch((error: any) => console.log(error))
            return result
        } catch (error) {
            console.log(`${this.getType()} error: ` + error)
            if (!this.nextChain) {
                console.log('There is no another provider... (')
                return null
            }
            return await this.nextChain.getCurrencyRate(from, to)
        }
    }

    getType(): string {
        return 'COINMARKET'
    }
}

export default CoinmarketRateChain
