class InvalidEmailError extends Error {

    public static INVALID_EMAIL = 'You are trying to add invalid email. Please fix it and try again.'

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, InvalidEmailError.prototype);
    }
}
