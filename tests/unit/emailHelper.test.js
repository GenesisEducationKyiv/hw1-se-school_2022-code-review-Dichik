const emailHelper = require('../../helpers/emailHelper')

describe('Test email helper\'s functions', () => {
    const invalidEmail = 'email@.com'
    const invalidEmailWithouDog = '123gmail.com'
    const validEmail = 'omeluan.dima@gmail.com'

    test('Test email validation', () => {
        expect(emailHelper.validateEmail(invalidEmail)).toBe(false)
        expect(emailHelper.validateEmail(invalidEmailWithouDog)).toBe(false)
        expect(emailHelper.validateEmail(validEmail)).toBe(true)
    })

    test('Test finding email in the list of emails', () => {
        const emailList = [
            validEmail, 
            "one.two@gmail.com",
            "three.four@ukr.net"
        ]
        expect(emailHelper.checkIfEmailExist(emailList, validEmail)).toBe(true)
        expect(emailHelper.checkIfEmailExist(emailList, invalidEmail)).toBe(false)
    })
})