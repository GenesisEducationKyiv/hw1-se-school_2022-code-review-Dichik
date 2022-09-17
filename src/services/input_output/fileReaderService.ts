import fs from 'fs'

class FileReaderService {

	public async read(path: string): Promise<string> {
		const data = fs.readFileSync(
			`./src/data/${path}`,
			'utf8'
		)
		return data
	}
	
}

export default FileReaderService
