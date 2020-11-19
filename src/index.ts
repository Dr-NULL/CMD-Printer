import { Wrapper } from './lib/wrapper';
import { Options } from './lib/options';
import { Parser } from "./tool/parser"
import { Exec } from "./tool/exec"

export {
  Options
};

export class CmdPrinter {
  private static _envVar: string;
  /**
   * Gets or sets the environment variable that contains a path to a custom SumatraPDF build,
   * in case do you need it.
   */
  public static get envVar(): string {
    return this._envVar;
  }
  public static set envVar(v: string) {
    this._envVar = v;

    // Check environment variable
    if (!process.env[this._envVar]) {
      console.log(
          `WARNING! -> this environment variable "${this._envVar}" doesn't has any value. `
        + 'If you want to use an external environment variable for execute a custom SumatraPDF build, '
        + 'first set this variable before execute a print request.'
      );
    }
  }

  public static async getAll(): Promise<CmdPrinter[]> {
    try {
      let raw = <string>await Exec.async("wmic printer list brief")
      return CmdPrinter.rawToInst(raw)

    } catch (err) {
      return Promise.reject("Unable to parse the string data into a Table Data")
    }
  }

  public static getAllSync(): CmdPrinter[] {
    try {
      let raw = <string>Exec.sync("wmic printer list brief")
      return CmdPrinter.rawToInst(raw)

    } catch (err) {
      throw new Error("Unable to parse the string data into a Table Data")
    }
  }

  private static rawToInst(raw: string) {
    let table = Parser.shellTable(raw)

    let out: CmdPrinter[] = []
    table.row.forEach(item => {
      out.push(new CmdPrinter(item[1]))
    })

    return out
  }

  public static async getByName(name: string): Promise<CmdPrinter | null> {
    try {
      let data = await this.getAll()
      let item: CmdPrinter | null = null
      data.forEach(printer => {
        if (printer.name == name) {
          item = printer
        }
      })
      return Promise.resolve(item)

    } catch (err) {
      return Promise.reject(err)
    }
  }

  public static getByNameSync(name: string): CmdPrinter | null {
    let data = this.getAllSync()
    let item: CmdPrinter | null = null
    let arr = name
      .split(/[\\\/]/gi)
      .filter(x => !x.match(/[\\\/]/gi))

    let reg: RegExp;
    if (arr.length > 1) {
      reg = new RegExp(`${arr[0]}.${arr[1]}`, 'gi')
    }

    data.forEach(printer => {
      if (reg) {
        if (printer.name.match(reg)) {
          item = printer
        }
      } else {
        if (printer.name == name) {
          item = printer
        }
      }
    })

    return item
  }

  public static print(printer: string, files: string[], options?: Options) {
    const sumatra = new Wrapper(CmdPrinter._envVar)
    return sumatra.print(printer, files, options)
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }

  private constructor(name: string) {
    this._name = name
  }

  public print(files: string[], options?: Options) {
    const sumatra = new Wrapper(CmdPrinter._envVar)
    return sumatra.print(this._name, files, options)
  }
}
export default CmdPrinter