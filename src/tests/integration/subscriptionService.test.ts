import SubscribtionService from "../../services/emails/subscriptionService";

describe('POST /subscribe', () => {
    const date = Date.now()
    const request = require('supertest')
    const baseURL = "http://localhost:8081"
    let addedEmails: Array<string> = [];
    let subscriptionService: SubscribtionService;
    

    const newEmail = {
        email: `test.email${date}@email.com`
    }
    const newInvalidEmail = {
        email: `test.email${date}email.com`
    }
    const repeatedEmail = {
        email: 'repeated.email@gmail.com'
    }

    beforeAll(async () => {
        subscriptionService = new SubscribtionService()
        try {
            await request(baseURL).post("/subscribe").send(repeatedEmail)
            addedEmails.push(repeatedEmail.email)
        } catch (error) {
            console.log(error)
        }
    })

    afterAll(async () => {
        // try {
        //     await subscriptionService.unsubscribe(addedEmails)
        // } catch (error) {
        //     console.log(error)
        // }
    })

    it('should subcribe new email', async () => {
        const response = await request(baseURL).post("/subscribe").send(newEmail)
        addedEmails.push(newEmail.email)
        const lastEmail = response.body.data[response.body.data.length-1]
        expect(response.statusCode).toBe(201);
        expect(lastEmail).toBe(newEmail.email);
    })

    it('shouldn\'t subcribe new invalid email', async () => {
        const response = await request(baseURL).post("/subscribe").send(newInvalidEmail)
        expect(response.statusCode).toBe(409);
    })

    it('shouldn\'t subcribe already existed email', async () => {
        const response = await request(baseURL).post("/subscribe").send(repeatedEmail)
        expect(response.statusCode).toBe(409);
    })

    it('should unsubscribe email', async () => {
        const response = await request(baseURL).post("/subscribe").send(newEmail)
        let newEmails: string[] = [];
        newEmails.push(newEmail.email)

        let emailsToRemove: string[] = []
        // try {
        //     emailsToRemove = await subscriptionService.unsubscribe(newEmails)
        // } catch(error) {
        //     console.log(error)
        // }
        expect(emailsToRemove).toStrictEqual(newEmails)
    })

})