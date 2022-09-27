interface ProviderChain {
    setNext(nextChain: ProviderChain): void

    getCurrencyRate(from: string, to: string): Promise<string>

    getType(): string
}

export default ProviderChain
