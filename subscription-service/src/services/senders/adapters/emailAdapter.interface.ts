import { EmailEntity } from '../../../models/email.entity'

export interface EmailAdapter {
    getMailOptions(email: EmailEntity): any
}