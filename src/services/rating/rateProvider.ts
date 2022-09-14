
abstract class RateProvider {

    abstract getRate(from: string, to: string): Promise<string>;

    abstract getType(): string;

}

export default RateProvider;