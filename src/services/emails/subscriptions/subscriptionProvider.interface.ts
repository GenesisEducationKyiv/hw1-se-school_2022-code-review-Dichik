import EmailEntity from "../models/email";

interface SubscriptionProvider {
    subscribe(request: Express.Request, response: Express.Response): Promise<EmailEntity[]>;
}

export default SubscriptionProvider;