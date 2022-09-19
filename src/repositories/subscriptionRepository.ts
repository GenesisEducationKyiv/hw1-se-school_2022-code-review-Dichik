import EmailEntity from "../services/emails/models/email.entity";
import FileReaderService from "../services/input_output/fileReaderService";
import FileWriterService from "../services/input_output/fileWriterService";
import Repository from "./repository.interface";


class SubscriptionRepository implements Repository<EmailEntity> {
    private static regexEmail: string = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    
    private storage: string;
	private fileReaderService: FileReaderService;
	private fileWriterService: FileWriterService;

    constructor() {
        this.storage = process.env.DEFAULT_STORAGE as string
		this.fileReaderService = new FileReaderService()
		this.fileWriterService = new FileWriterService()
    }

    delete(id: EmailEntity): EmailEntity {
        throw new Error("Method not implemented.");
    }
    
    async bulkDelete(emails: Array<EmailEntity>): Promise<Array<EmailEntity>> {
        let emailsToRemove: Array<EmailEntity> = []
        let emailsToSave: any = []
        const allEmails = await Promise.resolve(this.getAll())

		for(let i = 0; i < allEmails.length; ++ i) {
			let email = allEmails[i]
			if (!SubscriptionRepository.checkIfEmailExist(emails, email)) {
                emailsToSave.push(email)
            } else emailsToRemove.push(email)
		}

        let updatedEmails = JSON.stringify(emailsToSave)
        await this.fileWriterService.write(updatedEmails, this.storage)
		return emailsToRemove
    }

    async isExist(email: EmailEntity): Promise<boolean> {
        const allEmails = await this.getAll()
        if (SubscriptionRepository.checkIfEmailExist(allEmails, email)) {
			return true
		}
        return false
    }
    
    async getAll(): Promise<Array<EmailEntity>> {
        const dataFromFileJson = await this.fileReaderService.read(this.storage)
		if (!dataFromFileJson) {
			throw new Error("Couldn't load emails from file")
		}
        const allEmails: Array<EmailEntity> = JSON.parse(dataFromFileJson)
        return allEmails
    }

    getById(id: number): EmailEntity {
        throw new Error("Method not implemented.");
    }

    async save(email: EmailEntity): Promise<void> {
        if (!SubscriptionRepository.validateEmail(email)) {
			throw new InvalidEmailError(InvalidEmailError.INVALID_EMAIL)
		}
		if(this.isExist(email)) {
            throw new ExistedEmailError(`${email} already exists`)
        }

		const allEmails: Array<EmailEntity> = await Promise.resolve(this.getAll())
        allEmails.push(email)

		let updatedEmails = JSON.stringify(allEmails)
		await this.fileWriterService.write(updatedEmails, this.storage)
    }

	private static validateEmail(email: EmailEntity): boolean {
        const emailAddress = email.getAddress()
		return Boolean(emailAddress.match(this.regexEmail))
	}

	private static checkIfEmailExist(emails: Array<EmailEntity>, emailToCheck: EmailEntity): boolean {
		for(let i = 0; i < emails.length; ++ i) {
			if (emails[i].getAddress() === emailToCheck.getAddress()) return true
		}
		return false
	}

}

export default SubscriptionRepository;