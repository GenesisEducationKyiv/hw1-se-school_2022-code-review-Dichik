import { CoinbaseRateService } from '../chain/coinbaseRate.service'
import { Factory } from './factory.interface'
import { ProviderChain } from '../chain/providerChain.interface'

export class FactoryRate implements Factory {
    private factoryRate: Map<string, ProviderChain>

    constructor() {
        this.factoryRate = new Map<string, ProviderChain>()

        this.factoryRate.set('coinmarket', new CoinbaseRateService())
        this.factoryRate.set('coinbase', new CoinbaseRateService())
    }

    getByName(name: string): any {
        if (!this.factoryRate.has(name)) {
            console.log(`We don't have registered provider with name ${name}`)
            return null
        }
        return this.factoryRate.get(name)
    }
}