import Exec from "./tool/exec"
import Parser from "./tool/parser"
import * as SumatraPDF from "./tool/sumatra-pdf"
import { PDFToPrinter } from './tool/pdf-to-printer';

export { iOptions } from "./tool/sumatra-pdf"
export class CmdPrinter {
  //propiedades estáticas
  public static async getAll(): Promise<CmdPrinter[]> {
    //Obtener Parámetros
    try {
      let raw = <string>await Exec.async("wmic printer list brief")
      return CmdPrinter.rawToInst(raw)

    } catch (err) {
      return Promise.reject("Unable to parse the string data into a Table Data")
    }
  }

  //propiedades estáticas
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

    //Obtener Parámetros
    let out: CmdPrinter[] = []
    table.row.forEach(item => {
      if (item[4] == null) {
        out.push(new CmdPrinter(
          item[5],
          item[1]
        ))
      } else {
        out.push(new CmdPrinter(
          item[5],
          item[4]
        ))
      }
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

    data.forEach(printer => {
      if (printer.name == name) {
        item = printer
      }
    })

    return item
  }

  public static async printRemote(path: string, location: string, printerName: string, options?: SumatraPDF.iOptions) {
    SumatraPDF.printRemote(path, location, printerName, options)
    if (options) {
      await SumatraPDF.printRemote(path, location, printerName, options)
    } else {
      await PDFToPrinter.print(path, `\\\\${location}\\${printerName}`)
    }
  }

  private _location: string;
  public get location(): string {
    return this._location;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }

  private constructor(location: string, name: string) {
    this._location = location.replace(/(^(\\|\/)+|(\\|\/)+$)/gi, '')
    this._name = name
  }

  public async print(path: string, options?: SumatraPDF.iOptions) {
    if (options) {
      await SumatraPDF.printRemote(path, this._location, this._name, options)
    } else {
      await PDFToPrinter.print(path,  `\\\\${this._location}\\${this._name}`)
    }
  }
}
export default CmdPrinter