// import FileWriterService from "../../input_output/fileWriter.service"

// describe('Test FileWriterService', () => {

//     let fileWriterService: FileWriterService;

//     beforeAll(() => {
//         fileWriterService = new FileWriterService()
//     })

//     test('Test writing to the file', async () => {
//         const data = ["omeluan.dima@gmail.com","dima.omelyan03@gmail.com"]
//         const stringifiedData = JSON.stringify(data)
//         const result = await Promise.resolve(fileWriterService.write(stringifiedData, 'check_write.json'))
//         expect(result).not.toBe(null)
//     })

//     test('Test writing empty array to the file', async () => {
//         const data: string[] = []
//         const stringifiedData = JSON.stringify(data)
//         const result = await fileWriterService.write(stringifiedData, 'check_write.json')
//         expect(result).not.toBe(null)
//     })

// })
