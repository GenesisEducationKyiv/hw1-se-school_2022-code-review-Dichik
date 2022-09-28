import EmailEntity from "../models/email.entity";

interface EmailSender {

	send(email: EmailEntity, mailSubject: string, mailBody: string): Promise<void>

	sendBulk(): Promise<void>

}

export default EmailSender;