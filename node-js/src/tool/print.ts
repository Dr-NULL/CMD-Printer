import { quotePath } from './quote-path';
import { exec } from 'child_process';
import { join } from 'path';

export function print(files: string[], printers: string[]) {
  // Path executable
  let cmd = quotePath(join(
    __dirname, '..', '..', 'bin',
    `CMD-Printer-${process.arch}.exe`
  ))

  // Path files
  cmd += ' --files'
  for (let item of files) {
    cmd += ` "${item}"`
  }

  // Path Printer
  cmd += ' --printers'
  for (let item of printers) {
    item = item.replace(/^(\\|\/)+/gi, '')
    let arr = item.split(/(\\|\/)/gi)
      .filter(x => !x.match(/(\\|\/)/gi))

    if (arr.length > 1) {
      cmd += ` "\\\\${arr[0]}\\${arr[1]}"`
    } else {
      cmd += ` "${item}"`
    }
  }

  // Options
  cmd += ' --verbose'
  
  return new Promise((resolve, reject) => {
    let proc = exec(cmd, { encoding: 'utf8' })
    proc.on('exit', code => {
      if (code == 0) {
        resolve()
      } else {
        reject(new Error(`The client has throw an error.`))
      }
    })
  })
}