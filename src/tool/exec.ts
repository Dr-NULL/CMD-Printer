import * as child from "child_process"
import iconv from "iconv-lite"

module Exec{
    export let  sync = (cmd: string) => {
        const make = makeCmd(cmd)
        const proc = child.spawnSync(make.cmd, make.arg)

        if (proc.stdout == null) {
            return null
        } else {
            let stream = Buffer.from(proc.stdout)
            let output = iconv.decode(stream, "cp850")
            return output.replace(/\n+$/gi, "")
        }
    }

    export let async = (cmd: string) => {
        return new Promise<string>((resolve, reject) => {
            const make = makeCmd(cmd)
            const proc = child.spawn(make.cmd, make.arg)
            let data = Buffer.from([])
    
            proc.stdout.on("data", (stream: Buffer) => {
                data = Buffer.concat([data, stream])
            })
    
            proc.stdout.on("end", () => {
                let str = iconv.decode(data, "cp850")
                str = str.replace(/\n+$/gi, "")

                resolve(str)
            })
    
            proc.stderr.on("data", (stream: Buffer) => {
                let str = stream.toString("utf-8")
                str = str.replace(/\n+$/gi, "")
    
                reject(str)
            })
        })
    }

    let makeCmd = (cmd: string) => {
        let str = cmd.match(/"(.(?!"))+."/gi)
        let tmp: string[] = []
        
        if (str != null) {
            let alt = cmd
            str.forEach((item, i) => {
                alt = alt.replace(item, `{${i}}`)
            })
        
            alt = alt.replace(/\n/gi, "")
            alt = alt.replace(/\s+/gi, " ")
            tmp = alt.split(" ")
        
            tmp.forEach((item, i) => {
                if (item.match(/^\{[0-9]+\}$/) != null) {
                    let j = parseInt((<string[]>item.match(/[0-9]+/))[0])
                    tmp[i] = (<string[]>str)[j]
                }        
            })
        } else {
            cmd = cmd.replace(/\n/gi, "")
            cmd = cmd.replace(/\s+/gi, " ")
            tmp = cmd.split(" ")
        }
        
        let out: {
            cmd: string;
            arg: string[] | undefined
        } = {
            cmd: tmp[0],
            arg: undefined
        }
        
        if (tmp.length > 1) {
            tmp.shift()
            out.arg = tmp
        }

        return out
    }
}
export default Exec