import Exec from "./tool/exec"
import Parser from "./tool/parser"
import Global from "./global"
import * as child from "child_process"

class CmdPrinter{
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

    public static async printRemote(path: string, location: string, name: string): Promise<void>{
        let cmd = `.\\PDFtoPrinter.exe "${path}" "\\\\${location}\\${name}"`

        let proc = child.exec(cmd, (err, out) => {
            if (err != null) {
                return Promise.reject(err)
            } else {
                return Promise.resolve()
            }
        })
    }

    public static printRemoteSync(path: string, location: string, name: string): void {
        let cmd = `.\\PDFtoPrinter.exe "${path}" "\\\\${location}\\${name}"`

        child.execSync(cmd)
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

    public async print(path: string): Promise<void>{
        let cmd = `.\\PDFtoPrinter.exe "${path}" "${this._name}"`

        let proc = child.exec(cmd, (err, out) => {
            if (err != null) {
                return Promise.reject(err)
            } else {
                return Promise.resolve()
            }
        })
    }

    public printSync(path: string): void {
        let cmd = `.\\PDFtoPrinter.exe "${path}" "${this._name}"`

        child.execSync(cmd)
    }
}
export default CmdPrinter