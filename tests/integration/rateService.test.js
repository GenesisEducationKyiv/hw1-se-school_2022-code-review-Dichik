const request = require("supertest")
const baseURL = "http://localhost:8081"

describe('GET /rate', () => {
    it('should return 200', async () => {
        const response = await request(baseURL).get('/rate')
        expect(response.statusCode).toBe(200)
        expect(response.body.error).toBe(null || undefined)
    }), 
    it('should be float number', async () => {
        const response = await request(baseURL).get('/rate')
        const result = parseFloat(response.body)
        expect(result).not.toBe(NaN || null || undefined)
    })
})