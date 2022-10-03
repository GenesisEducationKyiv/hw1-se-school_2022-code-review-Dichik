import { inject, injectable } from 'tsyringe';
import { CustomCaching } from './caching/customCaching'
import { CryptoCurrencyChain } from './chain/cryptoCurrencyChain'

@injectable()
export class RateService {
    private cachingProvider: CustomCaching;

    constructor(
        @inject(CryptoCurrencyChain) private providerChain: CryptoCurrencyChain
    ) {
        this.cachingProvider = new CustomCaching();
    }

    async rate(): Promise<string> {
        return await Promise.resolve(
            this.cachingProvider.getCachedValue(this.providerChain)
        );
    }
}