import { EmailEntity } from "../../../models/email.entity";
import { EmailAdapter } from "./emailAdapter.interface";
import fetch from 'node-fetch';


export class NodemailerAdapter implements EmailAdapter {

    async getMailOptions(email: EmailEntity): Promise<any> {
        
        const priceForBTC = await Promise.resolve(this.getRate()) 
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
            const response = await fetch('http://localhost:8081/rate', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error(`Error while getting price! status: ${response.status}`);
            }

            const result = (await response.json()) as string
            console.log('Result is: ', result)
            return result
        } catch (error) {
            throw new Error(error as string)
        }
    }

}

export default NodemailerAdapter;