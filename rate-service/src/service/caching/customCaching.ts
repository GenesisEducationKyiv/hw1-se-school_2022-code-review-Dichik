import { CryptoCurrencyChain } from "../chain/cryptoCurrencyChain";

export class CustomCaching {
    private lastFetchingResult: string;
    private lastFetchingTime: number = Date.now();
    private CACHING_TIME: number = process.env
        .DEFAULT_CACHING_TIME as unknown as number;

    constructor() {
        this.lastFetchingResult = ''
    }

    public async getCachedValue(providerChain: CryptoCurrencyChain): Promise<string> {
        if (
            Date.now() - this.lastFetchingTime < this.CACHING_TIME &&
            this.lastFetchingResult !== ''
        ) {
            return this.lastFetchingResult
        }
        this.lastFetchingResult = await providerChain.getCurrencyRate()
        this.lastFetchingTime = Date.now()
        return this.lastFetchingResult
    }

}