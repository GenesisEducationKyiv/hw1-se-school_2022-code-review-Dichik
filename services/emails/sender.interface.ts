
interface Sender {

	send(recipient: string, mailSubject: string, mailBody: string): Promise<void>

	sendBulk(): Promise<void>

}

export default Sender;