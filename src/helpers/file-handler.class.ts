import fs from 'fs'
import { ERROR_MSGS } from '../constants'
import { isFileExists } from '../utils'

export class FileHandler {
  public async read(path: string) {
    if(!isFileExists(path))
      throw Error(`${ERROR_MSGS.INVALID_FILE} ${path}`)
    return fs.promises.readFile(path, "utf8")
  }

  public unlink(path: string){
    if(isFileExists(path) === true)
      fs.unlinkSync(path)
  }
}

export default new FileHandler() 

