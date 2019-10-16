module Global {
    export module Path {
        export const root = __dirname.replace(/(.(?!(\\|\/)))+$/gi, "\\").replace(/\\/gi, "/")
        export module Bin {
            export const sumatraPDF = root + "bin/SumatraPDF.exe"

        }
    }
}
export default Global