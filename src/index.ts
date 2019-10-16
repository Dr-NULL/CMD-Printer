import Exec from "./tool/exec"
import Parser from "./tool/parser"

class CmdPrinter{
    //propiedades estáticas
    public static getAll() {
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

    public static getByName(name: string) {
        let data = this.getAll()
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
}
export default CmdPrinter