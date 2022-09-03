const helper = {
	validateEmail(emailAddress) {
		let regexEmail = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
		return Boolean(emailAddress.match(regexEmail))
	},
	checkIfEmailExist(emails, emailToCheck) {
		for(let i = 0; i < emails.length; ++ i) {
			if (emails[i] === emailToCheck) return true
		}
		return false
	},
}

module.exports = helper
