export class InvalidCurrenctProviderError extends Error {

    public static INVALID_PROVIDER = 'Currency provider is not specified...'

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, InvalidCurrenctProviderError.prototype);
    }
}
