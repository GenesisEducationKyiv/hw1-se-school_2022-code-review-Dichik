export class SendEmailError extends Error {

    public static SEND_EMAIL_ISSUE = 'Error while sendeing email.'

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, SendEmailError.prototype);
    }
}
