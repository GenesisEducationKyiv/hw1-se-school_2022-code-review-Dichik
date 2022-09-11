
describe('POST /sendEmails', () => {

    const request = require('supertest')
    const baseURL = "http://localhost:8081"

    afterAll(async () => {
        // TODO delete from file, implement it when connect to DB
    })

    it('should subcribe new email', async () => {
        const response = await request(baseURL).post("/sendEmails").send()
        expect(response.statusCode).toBe(200);
    })

})