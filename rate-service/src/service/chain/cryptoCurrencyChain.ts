import { inject, injectable } from 'tsyringe';
import { InvalidCurrenctProviderError } from '../exceptions/invalidCurrencyProvider.error';
import { FactoryRate } from '../factory/factoryRate';
import { ProviderChain } from './providerChain.interface';
import { producer } from '../../../../rabbitmq/init'

@injectable()
export class CryptoCurrencyChain {
    private cryptoCurrencyProvider: ProviderChain

    constructor(
        @inject(FactoryRate) private factoryRate: FactoryRate
    ) {
        this.initProviders();
    }

    private initProviders(): void {
        const providers: string[] =
            process.env.CRYPTO_CURRENCY_PROVIDER?.split(' ');
        const chain: Array<ProviderChain> = [];
        for (let i = 0; i < providers?.length; ++i) {
            chain.push(this.factoryRate.getByName(providers[i]));
        }
        for (let i = 0; i < chain.length - 1; ++i) {
            chain[i].setNext(chain[i + 1]);
        }
        this.cryptoCurrencyProvider = chain.length > 0 ? chain[0] : null;
    }

    async getCurrencyRate(): Promise<string> {
        if (!this.cryptoCurrencyProvider) {
            throw new InvalidCurrenctProviderError(
                InvalidCurrenctProviderError.INVALID_PROVIDER
            );
        }
        const result = await this.cryptoCurrencyProvider.getCurrencyRate(
            'BTC',
            'UAH'
        );
        const loggedResponse: string = this.formResponse(result);
        producer.publish(loggedResponse);
        return loggedResponse;
    }

    private formResponse(result: string): string {
        return `${this.cryptoCurrencyProvider.getType()} - Response: ${result}`;
    }
}