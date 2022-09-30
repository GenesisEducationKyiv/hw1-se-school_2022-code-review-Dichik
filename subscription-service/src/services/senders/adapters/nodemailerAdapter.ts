import axios from "axios";
import { EmailEntity } from "../../../models/email.entity";
import EmailAdapter from "./emailAdapter.interface";

class NodemailerAdapter implements EmailAdapter {

    async getMailOptions(email: EmailEntity): Promise<any> {
        
        const priceForBTC = await Promise.resolve(this.getRate()) // TODO fix issue with getting price

		const mailSubject = 'BTC price in UAH'
		const mailBody = `Price for BTC ${priceForBTC} UAH`
        const recipient: string = email.address

        const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: recipient,
			subject: mailSubject,
			text: mailBody,
		}
        return mailOptions
    }

    private async getRate(): Promise<any> {
        try {
            const result = await Promise.resolve(axios.get(
                'http://localhost:8081/rate'
            ))
            return result
        } catch (error) {
            throw new Error(error as string)
        }
    }

}

export default NodemailerAdapter;