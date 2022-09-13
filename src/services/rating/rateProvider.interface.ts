
abstract class RateProvider {

    abstract getRate(from: string, to: string): Promise<string>;

}

export default RateProvider;