import { join } from 'path';
import { exec } from 'child_process';

const EXEC = join(__dirname, '..', '..', 'bin', 'PDFToPrinter.exe')

export class PDFToPrinter {
  /**
   * Print a Document.
   * @param path Path of the File to Print.
   * @param printer Print name -> `"\\location\name"`
   */
  public static print(path: string, printer: string) {
    let cmd = this.quotePath(EXEC) + ' '
    cmd += this.quotePath(path) + ' '
    cmd += '"' + printer + '"'

    return new Promise((resolve, reject) => {
      const proc = exec(cmd, { encoding: 'utf8' })

      proc.on('exit', (code, det) => {
        if (code == 0) {
          resolve()
        } else {
          reject(new Error(`The printer "${printer}" it's not found!`))
        }
      })
    })
  }

  /**
   * Adds quote marks for normalize routes.
   * @param path Path to add quotes.
   */
  private static quotePath(path: string) {
    let arr = path.split(/(\\|\/)/gi)
    let out = ''
    for (const item of arr) {
      if (item.match(/^(\\|\/)$/gi)) {
        continue
      }
      
      if (out.length > 0) {
        out += (process.platform == 'win32') ? '\\' : '/'
        out += `"${item}"`
      } else {
        out += item
      }
    }

    return out
  }
}