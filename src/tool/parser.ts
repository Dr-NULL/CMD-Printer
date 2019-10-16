module Parser {
    export let shellTable = (input: string) => {
        let raw = input
        raw = raw.replace(/\r+/gi, "")
        raw = raw.replace(/\n+$/gi, "")
        
        //Obtener nombre Columnas
        let arr = raw.split("\n")
        let col = <string[]>arr[0].match(/(.(?!(\s\s)))+.\s+/gi)

        //Obtener data de Filas
        let row: Array<any[]> = []
        arr.shift()
        arr.forEach((line, i) => {
            let cell: string[] = []
            
            let j = 0
            while (line.length > 1) {
                let txt = line.substring(0, col[j].length)
                line = line.replace(txt, "")
                cell.push(txt.trim())

                j++
            }

            row.push(cell)
        })

        //Trimear columnas
        col.forEach((x, i) => col[i] = x.trim())

        //Parsear Filas
        row.forEach((line, x) => {
            line.forEach((cell, y) => {
                if (cell == "") {
                    //Convertir a NULL
                    row[x][y] = null
                } else if(!isNaN(cell)) {
                    //convertir a Numérico
                    if (cell.match(/\./gi) == null) {
                        row[x][y] = parseInt(cell)
                    } else {
                        row[x][y] = parseFloat(cell)
                    }
                }
            })
        })

        return({
            col: col,
            row: row
        })
    }
}
export default Parser