import Exec from "./tool/exec"
import Parser from "./tool/parser"
import * as SumatraPDF from "./tool/sumatra-pdf"

export class CmdPrinter{
    //propiedades estáticas
    public static async getAll(): Promise<CmdPrinter[]> {
        //Ejecución del proceso en paralelo
        let raw = ""
        try {
            raw = <string>await Exec.async("wmic printer list brief")
        } catch(err) {
            return Promise.reject("The WIMIC Command has an error")
        }
    
        //Obtener Parámetros
        try {
            let table = Parser.shellTable(raw)
            let out: CmdPrinter[] = []
            table.row.forEach(item => {
                out.push(new CmdPrinter(
                    item[0],
                    item[1]
                ))
            })
            return Promise.resolve(out)
        
        } catch(err) {
            return Promise.reject("Unable to parse the string data into a Table Data")
        }
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
            
        } catch(err) {
            return Promise.reject(err)
        }
    }
    //propiedades estáticas
    public static getAllSync(): CmdPrinter[] {
        let raw = <string>Exec.sync("wmic printer list brief")
        let table = Parser.shellTable(raw)

        //Obtener Parámetros
        let out: CmdPrinter[] = []
        table.row.forEach(item => {
            out.push(new CmdPrinter(
                item[0],
                item[1]
            ))
        })

        return out
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

    public static printRemote(path: string, location: string, printerName: string, options?: SumatraPDF.iOptions): void {
        SumatraPDF.printRemote(path, location, printerName, options)
    }
    
    private _location : string;
    public get location() : string {
        return this._location;
    }

    private _name : string;
    public get name() : string {
        return this._name;
    }
    
    private constructor(location: string, name: string) {
        this._location = location
        this._name = name
    }

    public print(path: string, options?: SumatraPDF.iOptions): void {
        SumatraPDF.printLocal(path, this._name, options)
    }
}
export default CmdPrinter