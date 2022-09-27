import CryptoCurrencyChain from '../../../rating/chain/cryptoCurrencyChain'
import { EmailEntity } from '../../models/email.entity'
import EmailAdapter from './emailAdapter.interface'

class NodemailerAdapter implements EmailAdapter {
    private providerChain: CryptoCurrencyChain

    constructor() {
        this.providerChain = new CryptoCurrencyChain()
    }

    async getMailOptions(email: EmailEntity): Promise<any> {
        const priceForBTC = await Promise.resolve(
            this.providerChain.getCurrencyRate()
        )

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
}

export default NodemailerAdapter
