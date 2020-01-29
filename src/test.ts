import { CmdPrinter } from ".";

CmdPrinter.printRemote(
    "C:\\Users\\felipe.silva\\Desktop\\Test SumatraPDF\\test.pdf",
    null,
    'printerTotem_Z_Development',
    {
        adjust: 'noscale',
        color: 'monocrome',
        mode: 'simplex',
        skip: 'odd',
        cant: 1
    }
)