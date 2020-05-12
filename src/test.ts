import { CmdPrinter } from ".";
import { join } from "path";

(async function() {
    try {
        const filename = join(__dirname, "..", "test", "test-15x10.pdf")
        const printer = CmdPrinter.getByNameSync('ZDesigner_Test')
        await printer.print(filename)
    } catch (err) {
        console.error(err);
    }
})()