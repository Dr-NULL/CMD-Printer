import { Options } from './options';
import { exec } from 'child_process';
import { join } from 'path';

export class Wrapper {
  private path: string;


  public constructor() {
    this.path = join(__dirname, '..', '..', 'bin', 'SumatraPDF.exe')
  }

  private quotePath(input: string) {
    let arr = input
      .split(/[\\\/]/gi)
      .filter(x => x.match(/[^\\\/]/gi))

    let out = arr.shift()
    for (const item of arr) {
      out += `/"${item}"`
    }

    return out
  }

  public async print(printer: string, files: string[], options?: Options) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Make Options
        let opt = null
        if (options) {
          opt = ''
          if (options.cant) {
            opt += `${options.cant}x,`
          }
    
          if (options.skip) {
            opt += `${options.skip},`
          }
    
          if (options.mode) {
            opt += `${options.mode},`
          }
    
          if (options.color) {
            opt += `${options.color},`
          }
    
          opt = opt.replace(/,$/gi, '')
        }
        
        for (const file of files) {
          // Build Command
          let cmd =
            this.quotePath(this.path) + ' '
            + this.quotePath(file) + ' '
            + '-print-to '
    
          // Format print
          if (printer.match(/[\\\/]/gi)) {
            printer = printer.replace(/\//gi, '\\')
            printer = printer.replace(/^\\+/gi, '')
            printer = '\\\\' + printer
          }
    
          cmd += `"${printer}" -silent`
          cmd += (opt) ? ` -print-settings "${opt}"` : ''
          await this.execute(cmd)
        }

        resolve()
      } catch (err) {
        reject(err.message)
      }
    })
  }

  private execute(cmd: string) {
    return new Promise<void>((resolve, reject) => {
      const proc = exec(cmd.trim(), { encoding: 'utf8' })
      proc.on('exit', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject()
        }
      })
    })
  }
}
