import { resolve } from 'path';
import { exec, execSync } from 'child_process';

export interface iOptions {
  [key: string]: any;

  adjust?: 'noscale' | 'shrink' | 'fit';
  color?: 'color' | 'monocrome';
  mode?: 'duplex' | 'duplexshort' | 'duplexlong' | 'simplex';
  skip?: 'odd' | 'even';
  cant?: number;
}

export function printLocal(path: string, printer: string, options?: iOptions) {
  // Armar Comando Base
  let exePath = resolve(__dirname, '..', '..', 'bin', 'SumatraPDF.exe')
    .replace(/\\/gi, '/')
    .split(/\//gi)

  let cmd = ''
  for (let i = 0; i < exePath.length; i++) {
    if (i == 0) {
      cmd += exePath[i]
    } else {
      cmd += `/"${exePath[i]}"`
    }
  }
  cmd += ` -print-to "${printer}" -silent "${path}"`

  if ((options != null) && (options != undefined)) {
    cmd += ' -print-settings "'

    let param: Array<Array<string>> = []
    let keys = Object.keys(options)

    for (let i = 0; i < keys.length; i++) {
      if (i > 0) { cmd += ',' }

      cmd += String(options[keys[i]])
      if (keys[i] == 'cant') { cmd += 'x' }
    }

    cmd += '"'
  }

  return new Promise((resolve, reject) => {
    const proc = exec(cmd, { encoding: 'utf8' })

    proc.on('exit', code => {
      if (code == 0) {
        resolve()
      } else {
        reject(new Error(`The printer "${printer}" it's not found!`))
      }
    })
  })
}

export async function printRemote(path: string, location: string, printer: string, options?: iOptions) {
  try {
    if (location != null) {
      location = location
        .trim()
        .toLowerCase()
        .replace(/^(\\|\/)+/gi, '')
    }

    switch (location) {
      case null:
      case '::1':
      case '127.0.0.1':
      case 'localhost':
        await printLocal(path, printer, options)
        break
      default:
        await printLocal(path, `\\\\${location}\\${printer}`, options)
        break
    }
  } catch (err) {
    throw new Error(err.message)
  }
}