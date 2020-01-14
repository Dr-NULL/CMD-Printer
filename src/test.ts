import { CmdPrinter } from ".";

let test = CmdPrinter.getByNameSync("BIXOLON SRP-350III")
test.print(
    "C:\\Users\\felipe.silva\\Desktop\\Test SumatraPDF\\test.pdf",
    {
        adjust: 'noscale',
        color: 'monocrome',
        mode: 'simplex',
        skip: 'odd',
        cant: 1
    }
)