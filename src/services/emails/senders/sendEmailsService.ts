import EmailSender from './sender.interface';
import SubscriptionRepository from '../../../repositories/subscriptionRepository';
import EmailEntity from '../models/email.entity';
import SendEmailAdapter from './sendEmailAdapter';
import Transporter from '../transporters/transporter.interface';
import NodeMailer from '../transporters/emailTransporter';
require('dotenv').config()

class SendEmailService implements EmailSender {

	private emailsRepository: SubscriptionRepository;
	private emailAdapter: SendEmailAdapter;
	private mailer: Transporter;

	constructor() {
		this.emailsRepository = new SubscriptionRepository();
		this.emailAdapter = new SendEmailAdapter()
		this.mailer = new NodeMailer();
	}

	public async send(email: EmailEntity): Promise<void> {
		try {
			const mailOptions = this.emailAdapter.getMailOptions()
			await this.mailer.send(mailOptions)
		} catch (error) {
			console.log(error)
			throw new SendEmailError(SendEmailError.SEND_EMAIL_ISSUE)
		}
	}

	public async sendBulk(): Promise<void> {
		let emails: Array<EmailEntity> = await this.emailsRepository.getAll()
		const mailsWithIssues: string[] = []
		for (let i = 0; i < emails.length; ++i) {
			try {
				await this.send(emails[i])
			} catch (error) {
				console.log(error)
				mailsWithIssues.push(emails[i].getAddress())
			}
		}
		let message = !mailsWithIssues.length
			? 'Emails were sent'
			: `All mails except ${mailsWithIssues} were sent`
		console.log(message)
	}

}

export default SendEmailService;