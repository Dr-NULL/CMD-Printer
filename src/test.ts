import CmdPrinter from "./index"

console.clear()
//test Async
let testAsync = async () => {
    //List all printers
    let list = await CmdPrinter.getAll()

    //Getting a especified printer
    let zebra = <CmdPrinter>await CmdPrinter.getByName("ZDesigner_Test")

    //Print a Document
    await zebra.print(`test/test.pdf`)
    console.log("Async -> DONE!")
}
//testAsync()

//Test Sync
let testSync = () => {
    //List all printers
    let list = CmdPrinter.getAllSync()

    //Getting a especified printer
    let zebra = <CmdPrinter>CmdPrinter.getByNameSync("ZDesigner_Test")

    //Print a Document
    zebra.printSync(`test/test.pdf`)
    console.log(" Sync -> DONE!")
}
testSync()

//Test Remote
let testRemote = () => {
    CmdPrinter.printRemoteSync(
        'test/test.pdf',
        '192.168.20.249',
        'BIXOLON SRP-350III'
    )
}
//testRemote()