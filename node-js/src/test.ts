import { CmdPrinter } from ".";
import { join } from "path";

(async function() {
    try {
        const filename = join(__dirname, "..", "test", "test-15x10.pdf")
        CmdPrinter.printRemote(
          [ filename ],
          [ '\\\\NB-FSILVA\\EasyCoder PX4i (203 dpi) - DP 100 x 150' ]
        )
    } catch (err) {
        console.error(err);
    }
})()