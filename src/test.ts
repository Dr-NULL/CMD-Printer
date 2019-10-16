import CmdPrinter from "./index"

console.clear()
let list = CmdPrinter.getAll()
console.log("All Printers installed:")
console.log(list)

let zebra = CmdPrinter.getByName("ZDesigner_Test")
console.log("\nA Printer installed:")
console.log(zebra)