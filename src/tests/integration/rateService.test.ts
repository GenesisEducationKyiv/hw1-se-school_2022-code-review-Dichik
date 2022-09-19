
describe('GET /rate', () => {

    const request = require('supertest')
    const baseURL = "http://localhost:8081"

    it('should return 200', async () => {
        const response = await request(baseURL).get('/rate')
        expect(response.statusCode).toBe(200)
        expect(response.body.error).toBe(null || undefined)
    })

    it('test with body', async () => {
        const data = {
            from: 'BTC',
            to: 'KIA'
        }
        const response = await request(baseURL).get('/rate').send(data)
        expect(response).not.toBe(NaN || null || undefined)
    })
    
    it('should be float number', async () => {
        const response = await request(baseURL).get('/rate')
        const result = parseFloat(response.body)
        expect(result).not.toBe(NaN || null || undefined)
    })

    it('test caching with timeout >5000ms', async () => {
        
        // TODO after adding caching to rate service
    })

    it('test timout with <5000ms', async () => {
        const response1 = await request(baseURL).get('/rate')
        const result1 = parseFloat(response1.body)

        const response2 = await request(baseURL).get('/rate')
        const result2 = parseFloat(response2.body)
        expect(result1).toBe(result2)
    })

})