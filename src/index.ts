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
                    item[1],
                    item[2],
                    item[3],
                    item[4],
                    item[5]
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
                item[1],
                item[2],
                item[3],
                item[4],
                item[5]
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
    
    private _location : string;
    public get location() : string {
        return this._location;
    }
    public set location(v : string) {
        this._location = v;
    }

    private _name : string;
    public get name() : string {
        return this._name;
    }
    
    private _state : number;
    public get state() : number {
        return this._state;
    }
    public set state(v : number) {
        this._state = v;
    }
    
    private _status : number;
    public get status() : number {
        return this._status;
    }
    public set status(v : number) {
        this._status = v;
    }
    
    private _shareName : string;
    public get shareName() : string {
        return this._shareName;
    }
    public set shareName(v : string) {
        this._shareName = v;
    }

    private _systemName : string;
    public get systemName() : string {
        return this._systemName;
    }
    public set systemName(v : string) {
        this._systemName = v;
    }
    
    private constructor(location: string, name: string, state: number, status: number, shareName: string, systemName: string) {
        this._location = location
        this._name = name
        this._state = state
        this._status = status
        this._shareName = shareName
        this._systemName = systemName
    }

    public async print(path: string): Promise<void>{
        let cmd = Global.Path.Bin.sumatraPDF
        cmd += ` -print-to "${this._name}"`
        cmd += ` -silent ${path}`

        let proc = child.exec(cmd, (err, out) => {
            if (err != null) {
                return Promise.reject(err)
            } else {
                return Promise.resolve()
            }
        })
    }

    public printSync(path: string): void {
        let cmd = Global.Path.Bin.sumatraPDF
        cmd += ` -print-to "${this._name}"`
        cmd += ` -silent ${path}`

        child.execSync(cmd)
    }
}
export default CmdPrinter