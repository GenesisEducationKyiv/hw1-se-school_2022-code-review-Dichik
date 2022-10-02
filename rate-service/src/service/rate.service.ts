import { CustomCaching } from './caching/customCaching'
import { CryptoCurrencyChain } from './chain/cryptoCurrencyChain'

export class RateService {
    private providerChain: CryptoCurrencyChain;
    private cachingProvider: CustomCaching;

    constructor() {
        this.providerChain = new CryptoCurrencyChain();
        this.cachingProvider = new CustomCaching();
    }

    async rate(): Promise<string> {
        return await Promise.resolve(
            this.cachingProvider.getCachedValue(this.providerChain)
        );
    }
}