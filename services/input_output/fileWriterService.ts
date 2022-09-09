import fs from 'fs'

class FileWriterService {

	public async writeToFile(data: string, path: string): Promise<void> {
		fs.writeFileSync(`data/${path}`, data, 'utf8')
	}
	
}

export default FileWriterService

