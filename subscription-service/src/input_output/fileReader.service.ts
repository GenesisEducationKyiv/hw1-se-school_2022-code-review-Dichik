import fs from 'fs'

class FileReaderService {
    public async read(path: string): Promise<string> {
        if (path === undefined) path = 'emails.json'
        const data = fs.readFileSync(`./subscription-service/src/data/${path}`, 'utf8')
        return data
    }
}

export default FileReaderService
