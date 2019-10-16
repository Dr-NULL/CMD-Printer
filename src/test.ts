import CmdPrinter from "./index"

console.clear()
//test Async
let testAsync = async () => {
    //List all printers
    let list = await CmdPrinter.getAll()
    console.log(list)

    //Getting a especified printer
    let zebra = <CmdPrinter>await CmdPrinter.getByName("ZDesigner_Test")
    console.log(zebra)

    //Print a Document
    await zebra.print(`test/test.pdf`)
    console.log("Async -> DONE!")
}
testAsync()

//Test Sync
let testSync = () => {
    //List all printers
    let list = CmdPrinter.getAllSync()
    console.log(list)

    //Getting a especified printer
    let zebra = <CmdPrinter>CmdPrinter.getByNameSync("ZDesigner_Test")
    console.log(zebra)

    //Print a Document
    zebra.printSync(`test/test.pdf`)
    console.log(" Sync -> DONE!")
}
testSync()