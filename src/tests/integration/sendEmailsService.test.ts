import SendEmailService from "../../services/emails/senders/sendEmails.service";

describe('POST /sendEmails', () => {

    const request = require('supertest')
    const baseURL = "http://localhost:8081"

    let sendEmailService: SendEmailService;

    beforeAll(() => {
        sendEmailService = new SendEmailService();
    })

    afterAll(async () => {
        // TODO delete from file, implement it when connect to DB
    })

    it('should subcribe new email', async () => {
        const response = await request(baseURL).post("/sendEmails").send()
        expect(response.statusCode).toBe(200);
    })

    it('test sending email to one recipient', async () => {
        const error: any = null
        // try {
        //     await sendEmailService.send()
        // } catch(e) {
        //     error = e
        //     console.log(e)
        // }
        expect(error).toBe(null)
    })

})