import { CmdPrinter } from ".";
import { join } from "path";

try {
    CmdPrinter.printRemote(
        join(__dirname, "..", "test", "test.pdf"),
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
} catch (err) {
    console.error(err);
}