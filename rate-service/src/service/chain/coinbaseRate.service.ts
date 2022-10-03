import axios from 'axios'
import { ProviderChain } from './providerChain.interface'

export class CoinbaseRateService implements ProviderChain {
    private nextChain: ProviderChain

    setNext(nextChain: ProviderChain): void {
        this.nextChain = nextChain;
    }

    public async getCurrencyRate(from: string, to: string): Promise<string> {
        try {
            const result = await axios.get(
                'https://api.coinbase.com/v2/prices/BTC-UAH/buy'
            );
            return result.data.data.amount;
        } catch (error) {
            console.log(`${this.getType()} error: ` + error);
            if (!this.nextChain) {
                console.log('There is no another provider... (');
                return null;
            }
            return await this.nextChain.getCurrencyRate(from, to);
        }
    }

    getType(): string {
        return 'COINBASE';
    }
}