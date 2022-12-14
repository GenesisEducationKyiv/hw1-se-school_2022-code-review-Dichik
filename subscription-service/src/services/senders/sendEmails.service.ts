import { EmailSender } from './sender.interface'
import { SubscriptionRepository } from '../../repositories/subscription.repository'
import { Transporter } from '../transporters/transporter.interface'
import { NodeMailer } from '../transporters/emailTransporter'
import { NodemailerAdapter } from './adapters/nodemailerAdapter'
import { SendEmailError } from './exceptions/sendEmail.error'
import { EmailEntity } from '../../models/email.entity'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SendEmailService implements EmailSender {

    constructor(
        @inject(SubscriptionRepository) private emailsRepository: SubscriptionRepository,
        @inject(NodemailerAdapter) private emailAdapter: NodemailerAdapter,
        @inject(NodeMailer) private mailer: Transporter
    ) {}

    public async send(email: EmailEntity): Promise<void> {
        try {
            const mailOptions = await Promise.resolve(
                this.emailAdapter.getMailOptions(email)
            )
            await this.mailer.send(mailOptions)
        } catch (error) {
            console.log(error)
            throw new SendEmailError(SendEmailError.SEND_EMAIL_ISSUE)
        }
    }

    public async sendBulk(): Promise<void> {
        const emails: Array<EmailEntity> = await this.emailsRepository.getAll()
        const mailsWithIssues: string[] = []
        for (let i = 0; i < emails.length; ++i) {
            try {
                await this.send(emails[i])
            } catch (error) {
                console.log(error)
                mailsWithIssues.push(emails[i].address)
            }
        }
        const message = !mailsWithIssues.length
            ? 'Emails were sent'
            : `All mails except ${mailsWithIssues} were sent`
        console.log(message)
    }
}