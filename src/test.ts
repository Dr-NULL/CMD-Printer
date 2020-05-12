import { CmdPrinter } from ".";
import { join } from "path";

(async function() {
    try {
        const filename = join(__dirname, "..", "test", "test-15x10.pdf")
        CmdPrinter.printRemote(filename, 'NB-FSILVA', 'ZDesigner_Test')
    } catch (err) {
        console.error(err);
    }
})()