helper = {
    validateEmail(emailAdress) {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailAdress.match(regexEmail)) {
            return true;
        }
        return false;
    },
    checkIfEmailEÍxist(emails, newEmailObj) {
        for (let i = 0; i < emails.length; ++i) {
            let recipient = JSON.parse(emails[i])
            let newEmail = JSON.parse(newEmailObj)
            if (recipient.email === newEmail.email) return true
        }
        return false
    }
}


module.exports = helper