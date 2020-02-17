import { CmdPrinter } from ".";
import { join } from "path";

(async function() {
    try {
        const filename = join(__dirname, "..", "test", "test.pdf")
        const printer = CmdPrinter.getByNameSync('Microsoft Print to PDF')
        await printer.print(filename)
    } catch (err) {
        console.error(err);
    }
})()