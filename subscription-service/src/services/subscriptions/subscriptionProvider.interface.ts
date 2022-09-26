import { EmailEntity } from "../../models/email.entity";

interface SubscriptionProvider {
    subscribe(request: Express.Request, response: Express.Response): Promise<EmailEntity[]>;
}

export default SubscriptionProvider;