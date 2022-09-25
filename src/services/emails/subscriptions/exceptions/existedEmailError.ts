export class ExistedEmailError extends Error {

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, ExistedEmailError.prototype);
    }
}
