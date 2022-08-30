const helper = {
	validateEmail(emailAddress) {
		let regexEmail = '/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/'
		return Boolean(emailAddress.match(regexEmail))
	},
	checkIfEmailExist(emails, newEmail) {
		for (let i = 0; i < emails.length; ++i) {
			let recipient = JSON.parse(emails[i])
			if (recipient.email === newEmail) return true
		}
		return false
	},
}

module.exports = helper
