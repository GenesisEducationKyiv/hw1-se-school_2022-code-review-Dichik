import { EmailEntity } from '../models/email.entity'
import { ExistedEmailError } from '../services/subscriptions/exceptions/existedEmail.error'
import { InvalidEmailError } from '../services/subscriptions/exceptions/invalidEmail.error'
import { FileReaderService } from '../input_output/fileReader.service'
import { FileWriterService } from '../input_output/fileWriter.service'
import { Repository } from './repository.interface'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SubscriptionRepository implements Repository<EmailEntity> {
    private static regexEmail = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+'

    private storage: string;

    constructor(
        @inject(FileReaderService) private fileReaderService: FileReaderService, 
        @inject(FileWriterService) private fileWriterService: FileWriterService
    ) {
        this.storage = process.env.DEFAULT_STORAGE as string;
    }

    async isExist(email: EmailEntity): Promise<boolean> {
        const allEmails = await Promise.resolve(this.getAll());
        return SubscriptionRepository.isEmailExist(allEmails, email);
    }

    async getAll(): Promise<Array<EmailEntity>> {
        const dataFromFileJson = await Promise.resolve(
            this.fileReaderService.read(this.storage)
        );
        if (!dataFromFileJson) {
            throw new Error("Couldn't load emails from file");
        }
        const allEmails: Array<EmailEntity> = JSON.parse(dataFromFileJson);
        return allEmails;
    }

    async save(email: EmailEntity): Promise<void> {
        if (!SubscriptionRepository.validateEmail(email)) {
            throw new InvalidEmailError(InvalidEmailError.INVALID_EMAIL)
        }
        const isExist: boolean = await this.isExist(email)
        if (isExist) {
            throw new ExistedEmailError(`${email.address} already exists`)
        }

        const allEmails: Array<EmailEntity> = await Promise.resolve(
            this.getAll()
        )
        allEmails.push(email)

        const updatedEmails = JSON.stringify(allEmails)
        await this.fileWriterService.write(updatedEmails, this.storage)
    }

    private static validateEmail(email: EmailEntity): boolean {
        const emailAddress = email.address
        return Boolean(emailAddress.match(this.regexEmail))
    }

    private static isEmailExist(
        emails: Array<EmailEntity>,
        emailToCheck: EmailEntity
    ): boolean {
        for (let i = 0; i < emails.length; ++i) {
            if (emails[i].address === emailToCheck.address) return true
        }
        return false
    }
}