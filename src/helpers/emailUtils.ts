
class EmailUtils {
	private regexEmail: string = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'

	public validateEmail(emailAddress: string): boolean {
		return Boolean(emailAddress.match(this.regexEmail))
	}

	public checkIfEmailExist(emails: string[], emailToCheck: string): boolean {
		for(let i = 0; i < emails.length; ++ i) {
			if (emails[i] === emailToCheck) return true
		}
		return false
	}

}

export default EmailUtils;