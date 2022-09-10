import request from "supertest"
const baseURL = "http://localhost:8081"

describe('POST /sendEmails', () => {

    afterAll(async () => {
        // TODO delete from file, implement it when connect to DB
    })

    it('should subcribe new email', async () => {
        const response = await request(baseURL).post("/sendEmails").send()
        expect(response.statusCode).toBe(200);
    })

})