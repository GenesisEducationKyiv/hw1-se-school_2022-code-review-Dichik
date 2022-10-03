import { EmailEntity } from '../../models/email.entity'

export interface SubscriptionProvider {
    subscribe(
        request: Express.Request,
        response: Express.Response
    ): Promise<EmailEntity[]>
}