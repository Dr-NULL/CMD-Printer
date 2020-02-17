import { CmdPrinter } from ".";
import { join } from "path";

try {
    const filename = join(__dirname, "..", "test", "test.pdf")
    const printer = CmdPrinter.getByNameSync('ZDesigner_Test')
    printer.print(filename)
} catch (err) {
    console.error(err);
}