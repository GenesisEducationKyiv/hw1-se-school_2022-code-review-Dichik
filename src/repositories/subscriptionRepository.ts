import EmailUtils from "../helpers/emailUtils";
import FileReaderService from "../services/input_output/fileReaderService";
import FileWriterService from "../services/input_output/fileWriterService";
import Repository from "./repository.interface";


class SubscriptionRepository implements Repository<string> {
    
    private storage: string;
	private emailUtils: EmailUtils;
	private fileReaderService: FileReaderService;
	private fileWriterService: FileWriterService;

    constructor() {
        this.storage = 'emails.json'
		this.emailUtils = new EmailUtils()
		this.fileReaderService = new FileReaderService()
		this.fileWriterService = new FileWriterService()
    }

    delete(id: string): string {
        throw new Error("Method not implemented.");
    }
    
    async bulkDelete(emails: string[]): Promise<string[]> {
        let emailsToRemove: Array<string> = []
        let emailsToSave: any = []
        const allEmails = await Promise.resolve(this.getAll())

		for(let i = 0; i < allEmails.length; ++ i) {
			let email = allEmails[i]
			if (!this.emailUtils.checkIfEmailExist(emails, email)) {
                emailsToSave.push(email)
            } else emailsToRemove.push(email)
		}

        let updatedEmails = JSON.stringify(emailsToSave)
        await this.fileWriterService.write(updatedEmails, this.storage)
		return emailsToRemove
    }

    async isExist(email: string): Promise<boolean> {
        const allEmails = await this.getAll()
        if (this.emailUtils.checkIfEmailExist(allEmails, email)) {
			return true
		}
        return false
    }
    
    async getAll(): Promise<string[]> {
        const dataFromFileJson = await this.fileReaderService.read(this.storage)
		if (!dataFromFileJson) {
			throw new Error("Couldn't load emails from file")
		}
        let allEmails = JSON.parse(dataFromFileJson)

        return allEmails
    }

    getById(id: number): string {
        throw new Error("Method not implemented.");
    }

    async save(email: string): Promise<void> {

        if (!this.emailUtils.validateEmail(email)) {
			throw new Error(
				'You are trying to add invalid email. Please fix it and try again.'
			)
		}
		this.isExist(email)
		const allEmails: string[] = await Promise.resolve(this.getAll())
        allEmails.push(email)

		let updatedEmails = JSON.stringify(allEmails)
		await this.fileWriterService.write(updatedEmails, this.storage)
    }

}

export default SubscriptionRepository;