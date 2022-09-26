import { EmailEntity } from "../../../models/email.entity";

interface EmailAdapter {
    getMailOptions(email: EmailEntity): any;
}

export default EmailAdapter;