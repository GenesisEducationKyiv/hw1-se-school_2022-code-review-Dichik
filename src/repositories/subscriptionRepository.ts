import FileReaderService from "../services/input_output/fileReaderService";
import FileWriterService from "../services/input_output/fileWriterService";
import Repository from "./repository.interface";


class SubscriptionRepository implements Repository<string> {
    private static regexEmail: string = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    
    private storage: string;
	private fileReaderService: FileReaderService;
	private fileWriterService: FileWriterService;

    constructor() {
        this.storage = process.env.DEFAULT_STORAGE as string
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
			if (!SubscriptionRepository.checkIfEmailExist(emails, email)) {
                emailsToSave.push(email)
            } else emailsToRemove.push(email)
		}

        let updatedEmails = JSON.stringify(emailsToSave)
        await this.fileWriterService.write(updatedEmails, this.storage)
		return emailsToRemove
    }

    async isExist(email: string): Promise<boolean> {
        const allEmails = await this.getAll()
        if (SubscriptionRepository.checkIfEmailExist(allEmails, email)) {
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
        if (!SubscriptionRepository.validateEmail(email)) {
			throw new InvalidEmailError(InvalidEmailError.INVALID_EMAIL)
		}
		if(this.isExist(email)) {
            throw new ExistedEmailError(`${email} already exists`)
        }

		const allEmails: string[] = await Promise.resolve(this.getAll())
        allEmails.push(email)

		let updatedEmails = JSON.stringify(allEmails)
		await this.fileWriterService.write(updatedEmails, this.storage)
    }

	private static validateEmail(emailAddress: string): boolean {
		return Boolean(emailAddress.match(this.regexEmail))
	}

	private static checkIfEmailExist(emails: string[], emailToCheck: string): boolean {
		for(let i = 0; i < emails.length; ++ i) {
			if (emails[i] === emailToCheck) return true
		}
		return false
	}

}

export default SubscriptionRepository;