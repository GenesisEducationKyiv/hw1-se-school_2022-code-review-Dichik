import { EmailEntity } from '../../models/email.entity'

export interface EmailSender {
    send(
        email: EmailEntity,
        mailSubject: string,
        mailBody: string
    ): Promise<void>

    sendBulk(): Promise<void>
}