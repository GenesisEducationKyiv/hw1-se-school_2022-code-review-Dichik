const request = require("supertest")
const baseURL = "http://localhost:8081"

describe('POST /subscribe', () => {
    const date = Date.now()
    const newEmail = {
        email: `test.email${date}@email.com`
    }

    afterAll(async () => {
        // TODO delete from file, implement it when connect to DB
    })

    it('should subcribe new email', async () => {
        const response = await request(baseURL).post("/subscribe").send(newEmail)
        const lastEmail = response.body.data[response.body.data.length-1]
        expect(response.statusCode).toBe(201);
        expect(lastEmail).toBe(newEmail.email);
    })

})