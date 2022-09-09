
interface RateConfig {

    getRate: (from: string, to: string) => Promise<string>

}

export default RateConfig;